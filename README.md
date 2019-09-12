Setup
===

Setup database
====
```

$ mysql 
mysql> create database traildb;
mysql> source traildb.sql;

```

Change username and password
====

Edit ***db_credentials.py.sample*** and change the database name, username, password and server (to localhost) so that your database can be used. Then save the file as ***db_credentials.py***


Create and activate virtual env
====

```
virtualenv venv
./venv/bin/activate
pip install -r requirements.txt
./activate.sh
```
