from flask import Flask
from flask_mysql_connector import MySQL

app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_USER'] = 'root'  # MySQL username
app.config['MYSQL_PASSWORD'] = 'Abdo980756@'  # MySQL password
app.config['MYSQL_DATABASE'] = 'toolsdatabase'  # MySQL database name
app.config['MYSQL_HOST'] = '127.0.0.1'  # Database host
#app.config['MYSQL_PORT'] = 3306  # MySQL port

# Initialize MySQL with the app
mysql = MySQL(app)

print("Config script executed successfully.")
