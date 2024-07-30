from . import app
from flask_cors import CORS
from flask import request
from app.apis.admin import admin_routes
from app.apis.user import user_routes

app.register_blueprint(admin_routes, url_prefix="/admin")
app.register_blueprint(user_routes, url_prefix="/user")

@app.route("/")
def index():
    return "Hello World"