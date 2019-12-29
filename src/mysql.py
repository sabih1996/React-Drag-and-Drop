from flask import Flask, jsonify, request 
from flask_mysqldb import MySQL 
from flask_cors import CORS

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root1'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'db_tasks'

mysql = MySQL(app)
CORS(app)

@app.route('/api/task', methods=['POST'])
def add_task():
    cur = mysql.connection.cursor()
    tasks = request.get_json()['tasks']
    
    if(onDrop == true){
    cur.execute("INSERT INTO db_tasks.tasks (tasks) VALUES ('" + str(tasks) + "')")
    mysql.connection.commit()
    result = {'tasks':tasks}
    }