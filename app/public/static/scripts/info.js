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
            displayTokenInfoMistake(element, tokenId);
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

function displayTokenInfoMistake(element, tokenId) {
    let tokenInfoMistakeBox = document.createElement("div");
    let tokenInfoMistakeBoxInnerHTML = `
        <span>${translations.alert_type_mistake}</span>
        <div class="d-flex justify-content-center">
        <div class="w-50 mt-2 text-start">
    `;

    let checkedAttribute = "";
    if (element.innerHTML === request_results[tokenId]["text"])
        checkedAttribute = " checked";

    tokenInfoMistakeBoxInnerHTML += `
        <div>
            <input type="radio" name="radiogroup" id="radiogroup_initial"
                   onclick="resetToken(${tokenId})"${checkedAttribute}>
            <label for="radiogroup_initial">${translations.alert_type_mistake_initial_word}</label>
        </div>
    `

    for (let i = 0; i < request_results[tokenId]["similar"].length; i++) {
        let checkedAttribute = "";
        if (element.innerHTML === request_results[tokenId]["similar"][i][0])
            checkedAttribute = " checked";

        tokenInfoMistakeBoxInnerHTML += `
            <div>
                <input type="radio" name="radiogroup" id="radiogroup_${i}"
                       onclick="changeTokenToSimilar(${tokenId}, ${i})"${checkedAttribute}>
                <label for="radiogroup_${i}">
                    ${request_results[tokenId]["similar"][i][0]} : ${request_results[tokenId]["similar"][i][1]}
                </label>
            </div>
        `
    }

    tokenInfoMistakeBox.innerHTML = tokenInfoMistakeBoxInnerHTML + "</div></div>";

    swal({
        title: request_results[tokenId]["text"],
        content: tokenInfoMistakeBox,
    });
}

function resetToken(tokenId) {
    let element = document.getElementById(`res_span_${tokenId}`);
    element.innerHTML = request_results[tokenId]["text"];
    element.classList.remove("res_t_mistake_modified");
}

function changeTokenToSimilar(tokenId, similarId) {
    let element = document.getElementById(`res_span_${tokenId}`);
    element.innerHTML = request_results[tokenId]["similar"][similarId][0];
    element.classList.add("res_t_mistake_modified");
}