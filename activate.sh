#!/bin/bash

source ./venv/bin/activate
export FLASK_ENV=development
export FLASK_APP=main.py

python app.py
