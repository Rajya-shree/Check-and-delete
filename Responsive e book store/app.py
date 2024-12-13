from flask import Flask, render_template,request,redirect,url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        return redirect(url_for('index'))
    return render_template('login.html')

@app.route('/books')
def books():
    return render_template('books.html')

@app.route('/book1')
def book1():
    return render_template('book1.html')

if __name__ == '__main__':
    app.run(debug=True)
