from flask import Blueprint

blueprint = Blueprint(
    name="api",
    import_name=__name__,
    url_prefix="/api/"
)

from app.api.routes import core
