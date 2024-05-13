import json

from flask import Blueprint

blueprint = Blueprint(
    name="public",
    import_name=__name__,
    url_prefix="/",
    template_folder="templates",
    static_folder="static",
    static_url_path="/public/static/"
)

translations = {}
for lang in ["be", "ru", "en"]:
    with open(f"app/public/translations/{lang}.json", mode="r", encoding="utf-8") as file:
        translations[lang] = json.loads(file.read())


from app.public.routes import core
