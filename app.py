from flask import Flask, render_template, Response

app = Flask(__name__)

@app.route("/")
def main():
    return render_template('record.html')

if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=False)
