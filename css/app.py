import time

from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route('/form')
def get_method():  # put application's code here
    time.sleep(3)
    return 'Hello World!'


@app.route('/form', methods=['POST'])
def post_method():
    time.sleep(3)
    return '', 204


if __name__ == '__main__':
    app.run()
