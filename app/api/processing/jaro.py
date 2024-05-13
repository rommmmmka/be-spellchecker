from jellyfish import jaro_winkler_similarity

from app.api.processing import slounik


def process_jaro(token: str, min_similarity: float) -> list[list[str, float]]:
    similar_words = []

    for flounik_form in slounik:
        similarity = jaro_winkler_similarity(token, flounik_form)

        if similarity < min_similarity:
            continue
        if similarity == 1:
            similar_words = [[flounik_form, similarity]]
            return similar_words

        similar_words.append([flounik_form, similarity])

    return similar_words
