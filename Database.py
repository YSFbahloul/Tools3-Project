from flask import Flask
from flask_cors import CORS, cross_origin
import mysql.connector

app = Flask(__name__)
CORS(app)
