from flask import Flask, render_template, Response, session, escape, request
from db_connector import *
from importlib import import_module
import os

webapp = Flask(__name__)
db_connection = connect_to_database()
#TODO: generate this unique everytime using os.urandom(16)
webapp.secret_key = b'8\x9f\xf5\x83j\x9e\xaa\x83\x07+Ai\x9f\xd9\xc5_'

# import camera driver
if os.environ.get('CAMERA'):
    Camera = import_module('camera_' + os.environ['CAMERA']).Camera
else:
    from camera_opencv import Camera

@webapp.route("/")
def main():
    return render_template('record.html')

@webapp.route('/trail')
#the name of this function is just a cosmetic thing
def trail_show():
    print("Fetching and rendering people web page")
    query = "SELECT * from trail_action_log;"
    result = execute_query(db_connection, query).fetchall();
    print(result)

    return render_template('trail.html', rows=result)

@webapp.route('/trail-action/record/<action>', methods=['GET'])
#records a trail action
def trail_action_record(action):
    print("Recording an action on the trail")
    query = """
    INSERT INTO trail_action_log
    (time_in_trail, trail_id, action)
    VALUES
    (%s, %s, %s)
    """
    #TODO: calculate the timestamp
    timestamp = session['start_time']
    data = (timestamp, 2, action)
    execute_query(db_connection, query, data)
    return("Action recorded");

def gen(camera):
    """Video streaming generator function."""
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@webapp.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen(Camera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@webapp.route('/video')
def index():
    """Video streaming home page."""
    return render_template('index.html')

@webapp.route('/trail/start')
def start_trail():
    #TODO: Make this dynamic using utcnow()
    session['start_time'] = '12342';
    return session['start_time']

if __name__ == '__main__':
    webapp.run(host='0.0.0.0', debug=False)
