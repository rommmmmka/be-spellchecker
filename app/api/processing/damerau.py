from jellyfish import damerau_levenshtein_distance

from app.api.processing import slounik


def process_damerau(token: str, max_distance: int) -> list[list[str, int]]:
    similar_words = []

    for slounik_word in slounik:
        if abs(len(slounik_word) - len(token)) > max_distance:
            continue

        distance = damerau_levenshtein_distance(token, slounik_word)

        if distance > max_distance:
            continue
        if distance == 0:
            similar_words = [[slounik_word, distance]]
            return similar_words

        similar_words.append([slounik_word, distance])

    return similar_words
