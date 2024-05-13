from flask import render_template, redirect, url_for

from app.public import blueprint, translations


@blueprint.route('/')
@blueprint.route('/<lang>/')
def index(lang="be"):
    if lang not in ["be", "ru", "en"]:
        return redirect(url_for("public.index"))

    return render_template(
        "index.html",
        lang=lang,
        **translations[lang]
    )
