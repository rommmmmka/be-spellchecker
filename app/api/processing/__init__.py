import json

import stanza

with open("slounik/slounik.json", mode="r", encoding="utf-8") as file:
    slounik = json.loads(file.read())

stanza_tokenizer = stanza.Pipeline(
    lang="be",
    model_dir="temp/stanza",
    processors="tokenize",
    download_method=stanza.DownloadMethod.REUSE_RESOURCES,
)
