from flask import Flask, jsonify, request, session
from flask_mysqldb import MySQL  # Ensure this is installed
import pymysql
from Config import mysql  # Ensure that mysql is initialized in Config.py

app = Flask(__name__)

# Secret key for session management (use a secure random key in production)
app.secret_key = 'your_secret_key'

# Home route
@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the API!'})

# User Registration
@app.route('/register', methods=['POST'])
def register_user():
    conn = None
    cursor = None
    try:
        # Validate input data
        _json = request.json
        if not all(key in _json for key in ('name', 'email', 'phone', 'password')):
            return jsonify({'message': 'Missing required fields!'}), 400

        _name = _json['name']
        _email = _json['email']
        _phone = _json['phone']
        _password = _json['password']

        # Check if user already exists
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM Users WHERE email = %s", (_email,))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({'message': 'User already exists!'}), 400

        # Insert new user into the database
        sqlQuery = "INSERT INTO Users(name, email, phone, password) VALUES(%s, %s, %s, %s)"
        bindData = (_name, _email, _phone, _password)  # Consider hashing the password
        cursor.execute(sqlQuery, bindData)
        conn.commit()

        response = jsonify({'message': 'User registered successfully!'})
        response.status_code = 201
        return response
    except Exception as err:
        print(f"Error: {err}")  # Log the error for debugging
        return jsonify({'message': 'An error occurred during registration!'}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# User Login
@app.route('/login', methods=['POST'])
def login_user():
    conn = None
    cursor = None
    try:
        # Validate input data
        _json = request.json
        if not all(key in _json for key in ('email', 'password')):
            return jsonify({'message': 'Missing required fields!'}), 400

        _email = _json['email']
        _password = _json['password']

        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM Users WHERE email = %s", (_email,))
        user = cursor.fetchone()

        if user and _password == user['password']:  # Compare plain text password
            # Store user info in session if needed
            session['user_id'] = user['user_id']
            response = jsonify({'message': 'Login successful!'})
            response.status_code = 200
            return response
        else:
            return jsonify({'message': 'Invalid email or password!'}), 401
    except Exception as err:
        print(f"Error: {err}")  # Log the error for debugging
        return jsonify({'message': 'An error occurred during login!'}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# Handle 404 errors
@app.errorhandler(404)
def show_message(error=None):
    message = {
        'status': 404,
        'message': 'Record not found: ' + request.url,
    }
    response = jsonify(message)
    response.status_code = 404
    return response

if __name__ == "__main__":
    app.run(debug=True)
