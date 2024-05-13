import json
import os

from bs4 import BeautifulSoup

# https://github.com/Belarus/GrammarDB/releases
DIR = "grammar_db"
PROHIBITED_TYPES = ["nonstandard", "potential"]
BEAUTIFUL_JSON = False


def iterate_file(soup, slounik):
    for paradigm in soup.Wordlist.find_all("Paradigm"):
        if "type" in paradigm.attrs and paradigm["type"] in PROHIBITED_TYPES:
            continue

        for variant in paradigm.find_all("Variant"):
            if "type" in variant.attrs and variant["type"] in PROHIBITED_TYPES:
                continue

            for form in variant.find_all("Form"):
                if "type" in form.attrs and form["type"] in PROHIBITED_TYPES:
                    continue

                form_str = form.string.replace("+", "").lower()
                slounik.add(form_str)


if __name__ == "__main__":
    slounik = set()

    for filename in os.scandir(DIR):
        if filename.is_file():
            with open(filename.path, mode="r", encoding="utf-8") as file:
                print(filename.path)
                soup = BeautifulSoup(file, "xml")
                iterate_file(soup, slounik)

    slounik_list = sorted(list(slounik))

    with open("slounik.json", mode="w", encoding="utf-8") as file:
        file.write(
            json.dumps(
                slounik_list, ensure_ascii=False, indent=4 if BEAUTIFUL_JSON else None
            )
        )
