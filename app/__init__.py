from flask import Flask

from app.api import blueprint as api_blueprint
from app.public import blueprint as public_blueprint

app = Flask(__name__)

app.register_blueprint(api_blueprint)
app.register_blueprint(public_blueprint)
