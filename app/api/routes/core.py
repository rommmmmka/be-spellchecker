from flask import request, abort

from app.api import blueprint
from app.api.processing.core import process


@blueprint.route("/")
def index():
    return "There is nothing to see here"


@blueprint.route("/<method>/<range_value>/", methods=["GET", "POST"])
def process_text(method: str, range_value: str):
    if (
        request.method == "GET"
        or method not in ["1", "2"]
        or range_value not in map(str, range(1, 6))
        or "text" not in request.json
        or len(request.json["text"]) > 200
    ):
        return abort(400)

    return process(request.json["text"], int(method), int(range_value))
