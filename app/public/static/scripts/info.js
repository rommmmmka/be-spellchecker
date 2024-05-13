function displayTokenInfo(tokenId) {
    let element = document.getElementById(`res_span_${tokenId}`);
    switch(element.classList[0]) {
        case "res_t_slounik":
            displayTokenInfoSlounik(element);
            break;
        case "res_t_empty":
            displayTokenInfoEmpty(element);
            break;
        case "res_t_mistake":
            displayTokenInfoMistake(element);
    }
}

function displayTokenInfoSlounik(element) {
    swal({
        title: element.innerHTML,
        text: translations.alert_type_slounik,
    });
}

function displayTokenInfoEmpty(element) {
    let alert_type_empty_between = translations.increase_distance;
    if (states.last_used_method === 2)
        alert_type_empty_between = translations.decrease_similarity;

    swal({
        title: element.innerHTML,
        text: translations.alert_type_empty_1 + alert_type_empty_between + translations.alert_type_empty_2,
    });
}

function displayTokenInfoMistake(element) {

}
