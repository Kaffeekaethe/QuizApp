from flask import Flask, render_template
import json
import random
import codecs

app = Flask(__name__)

@app.route('/')
def render_question():
    return render_template('main.html')

@app.route('/questions')
def get_questions():
    return codecs.open("questions.txt", "r", "utf-8").read()
    
if __name__ == '__main__':  
    app.run(debug=True)
    app.config.update(TEMPLATES_AUTO_RELOAD=True)
