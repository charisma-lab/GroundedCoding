Step 1: Setup database
====
```

$ mysql 
mysql> drop database if exists traildb;
mysql> create database traildb;
mysql> source traildb.sql;

```

Step 2: Change username and password
====

Edit ***db_credentials.py.sample*** and change the database name, username, password and server (to localhost) so that your database can be used. Then save the file as ***db_credentials.py***


Step 3: Create and setup virtual environment
====

```
virtualenv venv
. ./venv/bin/activate
pip install -r requirements.txt
```


Running the application
===

Make sure:
* MySQL/MariaDB is running
* You have done all the 3 steps above.

Now, run
```
./activate.sh 
```

This will activate the virtual environment as well as run the application.
Now you can go to the browser to use the application!

This is what it looks like:

![Annotations Interface for Halloween](./meta/screenshot.png)

