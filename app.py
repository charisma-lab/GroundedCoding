from flask import Flask, render_template, Response
from db_connector import *

webapp = Flask(__name__)
db_connection = connect_to_database()

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

@webapp.route('/trail-action/record', methods=['GET'])
#records a trail action
def trail_action_record():
    print("Recording an action on the trail")
    query = """
    INSERT INTO trail_action_log
    (time_in_trail, trail_id, action)
    VALUES
    (%s, %s, %s)
    """
    data = (3.42, 2, "Test")
    execute_query(db_connection, query, data)
    return("Action recorded");

if __name__ == '__main__':
    webapp.run(host='0.0.0.0', debug=False)
