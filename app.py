from flask import Flask

app = Flask(__name__)

#method 1
@app.route('/<name>')

def hello(name):
    return "Hello %s! " % name

#method 2
#def gfg():
#   return "Riya Das"

#app.add_url_rule('/', 'endpointname', gfg)

if __name__ == '__main__':
    app.run(debug=True)