import json
from bisect import bisect_left

from stanza import Document

from app.api.processing import slounik, stanza_tokenizer
from app.api.processing.damerau import process_damerau
from app.api.processing.jaro import process_jaro

ALPHABET = "абвгдеёжзійклмнопрстуўфхцчшыьэюя'"


def process(data: str, method: int, range_value: int) -> str:
    doc = stanza_tokenizer(data)
    tokens, fillers = convert_to_tokens_and_fillers(data, doc)

    iterate_tokens(tokens, method, range_value)

    return json.dumps(merge_tokens_and_fillers(tokens, fillers), ensure_ascii=False)


def convert_to_tokens_and_fillers(
    data: str, doc: Document
) -> tuple[list[dict], list[dict]]:
    tokens = []
    fillers = []

    previous_end = 0
    for token in doc.iter_tokens():
        if not any(char in ALPHABET for char in token.text.lower()):
            continue

        token_start = token.start_char
        token_end = token.end_char
        while data[token_start].lower() not in ALPHABET and token_start <= token_end:
            token_start += 1
        while data[token_end - 1].lower() not in ALPHABET and token_start <= token_end:
            token_end -= 1

        fillers.append({"text": data[previous_end:token_start], "type": "filler"})
        tokens.append({"text": data[token_start:token_end], "type": "token"})
        previous_end = token_end

    fillers.append({"text": data[previous_end : len(data)], "type": "filler"})

    return tokens, fillers


def iterate_tokens(tokens: list[dict], method: int, range_value: int):
    method_func, method_value, method_reverse_sort = process_damerau, range_value, False
    if method == 2:
        method_func = process_jaro
        method_value = 1 - range_value * 0.05
        method_reverse_sort = True

    for token in tokens:
        token_text = token["text"]
        short_u, caps, first_capital = get_token_info(token_text)
        token_text = normalize_token(token_text, short_u)

        if is_in_slounik(token_text):
            token["in_slounik"] = True
            continue

        token["in_slounik"] = False
        token["similar"] = sorted(
            method_func(token_text, method_value),
            key=lambda x: x[1],
            reverse=method_reverse_sort,
        )[:10]

        for similar in token["similar"]:
            similar[0] = apply_token_info_to_similar(
                similar[0], short_u, caps, first_capital
            )


def get_token_info(token: str) -> tuple[bool, bool, bool]:
    short_u, caps, first_capital = False, False, False
    if token[0] == "ў":
        short_u = True
    if not any(sym.islower() for sym in token):
        caps = True
    if token[0].isupper() and not any(sym.isupper() for sym in token[1:]):
        first_capital = True
    return short_u, caps, first_capital


def normalize_token(token: str, short_u: bool) -> str:
    token = token.lower()
    if short_u:
        token = "у" + token[1:]
    return token


def apply_token_info_to_similar(
    similar: str, short_u: bool, caps: bool, first_capital: bool
):
    if short_u:
        similar = "ў" + similar[1:]
    if caps:
        similar = similar.upper()
    if first_capital:
        similar = similar.capitalize()
    return similar


def is_in_slounik(token: str) -> bool:
    i = bisect_left(slounik, token)
    if i != len(slounik) and slounik[i] == token:
        return True
    return False


def merge_tokens_and_fillers(tokens: list[dict], fillers: list[dict]):
    result = []

    for filler, token in zip(fillers, tokens):
        result.append(filler)
        result.append(token)
    result.append(fillers[-1])

    return result
