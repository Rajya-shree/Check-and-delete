/*document.getElementById('read-aloud-btn').addEventListener('click', function() {
    var textToRead = document.querySelector('.book-content').innerText; // Adjust the selector to match your book content area
    var speech = new SpeechSynthesisUtterance(textToRead);
    speech.lang = 'en-US'; // Set the language to English (US), you can change this if needed
    window.speechSynthesis.speak(speech);
});
*/
// static/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('read-aloud-btn');
    const icon = document.getElementById('btn-icon');
    const text = document.getElementById('btn-text');
    const bookContent = document.querySelector('.book-content');
    
    console.log('Button:', button);
    console.log('Icon:', icon);
    console.log('Text:', text);
    console.log('Book Content:', bookContent);
    //console.log('Extracted text:', textToRead);

    if (!button) {
        console.error('Button with id "read-aloud-btn" not found.');
        return;
    }
    if (!bookContent) {
        console.error('Element with class "book-content" not found.');
        return;
    }
    
    let speech = null;
    let isPaused = false;

    button.addEventListener('click', function() {
        // Initialize speech if not already done
        if (!speech) {
            readAloudWithHighlight();
            const textToRead = bookContent.innerText.trim();

            if (textToRead.length === 0) {
                alert('No text available to read.');
                return;
            }

            speech = new SpeechSynthesisUtterance(textToRead);
            speech.lang = 'en-US';

            speech.addEventListener('end', function() {
                resetButton();
                speech = null;
            });

            window.speechSynthesis.speak(speech);
            updateButton('pause');
            
        } else if (window.speechSynthesis.speaking && !isPaused) {
            // Pause the speech
            window.speechSynthesis.pause();
            isPaused = true;
            updateButton('play');
        } else if (isPaused) {
            // Resume the speech
            window.speechSynthesis.resume();
            isPaused = false;
            updateButton('pause');
        }
    });

    function updateButton(state) {
        if (state === 'play') {
            icon.className = 'fas fa-play';
            text.textContent = 'Resume';
        } else if (state === 'pause') {
            icon.className = 'fas fa-pause';
            text.textContent = 'Pause';
        } else {
            icon.className = 'fas fa-play';
            text.textContent = 'Read Aloud';
        }
    }

    function resetButton() {
        isPaused = false;
        updateButton('default');
    }
    function readAloudWithHighlight() {
        const paragraphs = document.querySelectorAll('book-content p');
        let currentIndex = 0;
        //let speech = null;

        function readNextParagraph() {
            if (currentIndex >= paragraphs.length) {
                resetHighlighting();
                return;
            }

            const textToRead = paragraphs[currentIndex].innerText.trim();
            if (textToRead.length === 0) {
                alert('No text available to read.');
                return;
            }

            const speech = new SpeechSynthesisUtterance(textToRead);
            speech.lang = 'en-US';
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;

            speech.onstart = () =>{} 
            speech.onend = () => {
                console.log('Speech ended');
                currentIndex++;
                readNextParagraph();
            };
            speech.onerror = function(event) {
                console.error('Speech synthesis error:', event.error);
            };

            if (window.speechSynthesis.speaking) {
                console.log('Cancelling previous speech');
                window.speechSynthesis.cancel();
            }

            highlightParagraph(currentIndex);

            speech.addEventListener('end', function() {
                currentIndex++;
                readNextParagraph();
            });

            window.speechSynthesis.speak(speech);
        }

        function highlightParagraph(index) {
            paragraphs.forEach((p, i) => {
                p.classList.remove('highlight');
                if (i === index) {
                    p.classList.add('highlight');
                }
            });
        }

        function resetHighlighting() {
            paragraphs.forEach(p => p.classList.remove('highlight'));
            //speech = null;
            //currentIndex = 0;
        }

        readNextParagraph();
    }
});

// script for navigation bar
feather.replace()