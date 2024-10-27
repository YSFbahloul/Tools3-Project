from flask import Flask, request, jsonify
from Config import app, mysql

@app.route('/register', methods=['POST'])
def register():
    try:
        # Retrieve data from request
        data = request.json
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        password = data.get('password')

        # Check if all fields are provided
        if not all([name, email, phone, password]):
            return jsonify({'error': 'Please provide all required fields'}), 400

        # Insert new user into the database
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Users (name, email, phone, password) VALUES (%s, %s, %s, %s)",
                       (name, email, phone, password))
        conn.commit()

        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        print(e)
        return jsonify({'error': 'Registration failed'}), 500
    finally:
        cursor.close() if cursor else None
        conn.close() if conn else None


@app.route('/login', methods=['POST'])
def login():
    try:
        # Retrieve data from request
        data = request.json
        email = data.get('email')
        password = data.get('password')

        # Check if required fields are provided
        if not all([email, password]):
            return jsonify({'error': 'Please provide email and password'}), 400

        # Retrieve user data from the database
        conn = mysql.connection
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Users WHERE email = %s AND password = %s", (email, password))
        user = cursor.fetchone()

        # Check if user exists
        if user:
            return jsonify({'message': 'Login successful', 'user': {'user_id': user['user_id'], 'name': user['name']}}), 200
        else:
            return jsonify({'error': 'Invalid email or password'}), 401
    except Exception as e:
        print(e)
        return jsonify({'error': 'Login failed'}), 500
    finally:
        cursor.close() if cursor else None
        conn.close() if conn else None

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
