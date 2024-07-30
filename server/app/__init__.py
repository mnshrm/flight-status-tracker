from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from twilio.rest import Client
from .models import db

# Improved organization for clarity
socketio = SocketIO()

# Can be passed using environment variables or secrets
account_sid = "TWILIO_ACCOUNT_SID"
auth_token = "TWILIO_ACCOUNT_AUTH_TOKEN"
client = Client(account_sid, auth_token)

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./store.sqlite3'
    app.config['SQLALCHEMY_ECHO'] = False
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    socketio.init_app(app, cors_allowed_origins="*")

    return app

app = create_app()

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    socketio.run(app, debug=True)