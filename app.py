from flask import Flask, render_template, Response, session, escape, request
from flask_api import status
from db_connector import *
from importlib import import_module
import os
import time

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
    #Don't record an action if the trail hasn't started!
    #TODO: Make this error actually appear as error the Jquery Ajax requester in groundedCoding.js
    if not 'trail_id' in session or session['trail_id'] is None:
       error = "You need to start the trail before you can record an action!"
       print(error)
       return error, status.HTTP_500_INTERNAL_SERVER_ERROR

    print("Recording an action on the trail")
    query = """
    INSERT INTO trail_action_log
    (trail_id, time_in_trail, action)
    VALUES
    (%s, %s, %s)
    """
    #TODO: calculate the timestamp
    timestamp = time.time() - float(session['trail_start_time'])
    data = (session['trail_id'], timestamp, action)
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
    session['trail_start_time'] = time.time() #Time in UTC!
    #TODO: Get data about this trail from the form!
    recorder_name = "Samar"
    trail_number = "42"

    #Create a record for this trail in traildb
    print("Saving the notes for this trail by updating this trail's record")
    query = """
        INSERT INTO trail
        (recorder_name, trail_number, started_on)
        VALUES
        (%s, %s, %s)
        """
    #TODO: FIXIT: now() doesn't actually insert the now time in the database for some reason
    data = (recorder_name, trail_number, time.strftime('%Y-%m-%d %H:%M:%S'));
    trail_id = execute_query(db_connection, query, data, send_last_inserted_id=True)
    #TODO: Get the last inserted id and put it as teh trail id in the sesion data
    session['trail_id'] = trail_id

    #Record this action of starting the trail!
    trail_action_record('Starting the trail')
    print ("Trail started with the id %s and on time %s"  % (session['trail_id'], session['trail_start_time']));
    return str(session['trail_start_time'])

#this will save the trail
@webapp.route('/trail/stop', methods=['POST'])
def stop_trail():
    #TODO: Stop video recording and save the video!
    #do the magic somehow!
    pass

    #save the notes to the database for this specific trail
    print("Saving the notes for this trail by updating this trail's record")
    query = """
        UPDATE trail
        SET trail_notes = %s,
        stopped_on = %s
        WHERE trail_id = %s
        """
    data = (request.form['notes'], time.strftime('%Y-%m-%d %H:%M:%S'), session['trail_id']);
    execute_query(db_connection, query, data)
    #Create an entry in the trail log about this stop action
    trail_action_record("Stopping the trail")

    #Delete the session data!
    session.pop('trail_id', None)
    session.pop('trail_start_time', None)
    return("Trail Stopped!")

if __name__ == '__main__':
    webapp.run(host='0.0.0.0', debug=False)
