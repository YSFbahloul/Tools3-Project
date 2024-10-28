from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysql_connector import MySQL


app = Flask(__name__)
CORS(app)  
app.config['MYSQL_USER'] = 'root'  
app.config['MYSQL_PASSWORD'] = 'Abdo980756@' 
app.config['MYSQL_DATABASE'] = 'toolsdatabase'  
app.config['MYSQL_HOST'] = '127.0.0.1' 



mysql = MySQL(app)


@app.route('/register', methods=['POST'])
def register():
    try:
       
        data = request.json
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        password = data.get('password')

        
        if not all([name, email, phone, password]):
            return jsonify({'error': 'Please provide all required fields'}), 400

       
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Users (name, email, phone, password) VALUES (%s, %s, %s, %s)",
                       (name, email, phone, password))
        conn.commit()

        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        print("Error during registration:", e)
        return jsonify({'error': 'Registration failed'}), 500
    finally:
        cursor.close() if cursor else None
        conn.close() if conn else None


@app.route('/login', methods=['POST'])
def login():
    try:
      
        data = request.json
        email = data.get('email')
        password = data.get('password')

       
        if not all([email, password]):
            return jsonify({'error': 'Please provide email and password'}), 400

      
        conn = mysql.connection
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Users WHERE email = %s AND password = %s", (email, password))
        user = cursor.fetchone()

        
        if user:
            return jsonify({'message': 'Login successful', 'user': {'user_id': user['user_id'], 'name': user['name']}}), 200
        else:
            return jsonify({'error': 'Invalid email or password'}), 401
    except Exception as e:
        print("Error during login:", e)
        return jsonify({'error': 'Login failed'}), 500
    finally:
        cursor.close() if cursor else None
        conn.close() if conn else None


if __name__ == "__main__":
    app.run(debug=True, port=8080)  