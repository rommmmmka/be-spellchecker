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
        <div class="mt-2 text-start">
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
    `;

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
        `;
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

function updateResultsButtonStates() {
    if (states.loading_result || states.last_used_method === -1) {
        btn_correct_all.setAttribute("disabled", "");
        btn_rollback_corrections.setAttribute("disabled", "");
        btn_save_to_file.setAttribute("disabled", "");
    } else {
        btn_correct_all.removeAttribute("disabled");
        btn_rollback_corrections.removeAttribute("disabled");
        btn_save_to_file.removeAttribute("disabled");
    }
}

function getTokenIdFromHtmlId(htmlId) {
    return Number(htmlId.substring(9));
}

btn_correct_all.addEventListener("click", function () {
    let elements = document.getElementsByClassName("res_t_mistake");
    Array.from(elements).forEach(function(element) {
        if (element.classList.contains("res_t_mistake_modified"))
            return;

        let tokenId = getTokenIdFromHtmlId(element.id);

        if (element.innerHTML !== request_results[tokenId]["text"])
            return;

        changeTokenToSimilar(tokenId, 0);
    });
});

btn_rollback_corrections.addEventListener("click", function () {
    let elements = document.getElementsByClassName("res_t_mistake_modified");
    Array.from(elements).forEach(function(element) {
        let tokenId = getTokenIdFromHtmlId(element.id);
        resetToken(tokenId);
    });
});

btn_save_to_file.addEventListener("click", function () {
    let text = "";
    let elements = document.getElementsByClassName("res_t");
    Array.from(elements).forEach(function(element) {
        text += element.innerHTML;
    });

    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(
        new Blob(
            [text],
            { type: "text/plain;charset=utf-8" },
        )
    );
    a.download = "result.txt";
    a.click();
});
