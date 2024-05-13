function clearOutput() {
    results.innerHTML = "";
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function displayLoadingAnimation(size) {
    let loadingAnimationHtml = "";
    for (let i = 0; i < getRandomInt(10, 15); i++) {
        loadingAnimationHtml += `<span class="placeholder col-${getRandomInt(1, 4)}"></span> `;
    }
    loading_animation.innerHTML = loadingAnimationHtml;
    results_block.scrollTop = results_block.scrollHeight;
}

function hideLoadingAnimation() {
    loading_animation.innerHTML = "";
}

async function makeApiRequest() {
    clearOutput();
    displayLoadingAnimation();

    let textAfterSplit = splitText();
    let method = (btn_dropdown_method.innerHTML === btn_method_1.innerHTML) ? 1 : 2;
    states.last_used_method = method;

    request_results = [];
    for (let i = 0; i < textAfterSplit.length; i++) {
        try {
            let response = await fetch(`http://127.0.0.1:5000/api/${method}/${range.value}`, {
                method: "POST",
                body: JSON.stringify({
                    text: textAfterSplit[i]
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })

            if (!response.ok) {
                throw TypeError;
            }

            // console.log(await response.text());
            displayApiRequestResults(await response.json());
            displayLoadingAnimation();
        }
        catch (err) {
            console.log(err)
            displayApiRequestError();
            break;
        }
    }
    hideLoadingAnimation();
}

function splitText() {
    let text = textarea.value;
    let textAfterSplit = [];

    let previousEnd = 0;
    while (previousEnd !== text.length) {
        let newEnd = text.indexOf(" ", previousEnd + 100) + 1;
        if (newEnd === 0 || text.length - newEnd < 30) {
            newEnd = text.length;
        }

        textAfterSplit.push(
            text.substring(previousEnd, newEnd)
        );
        previousEnd = newEnd;
    }

    return textAfterSplit;
}

function getResultClass(result) {
    if (result["type"] === "filler")
        return "filler"
    if (result["in_slounik"])
        return "slounik"
    if (result["similar"].length === 0)
        return "empty"
    return "mistake"
}

function displayApiRequestResults(newResults) {
    console.log(newResults)
    request_results.push(...newResults);

    let newResultsHtml = ""
    let starting_position = request_results.length - newResults.length;
    for (let i = starting_position; i < request_results.length; i++) {
        let result = request_results[i];
        let resultClass = getResultClass(result);

        let onClickFunc = ""
        if (resultClass !== "filler")
            onClickFunc = ` onclick="displayTokenInfo(${i})"`

        newResultsHtml += `<span id="res_span_${i}" class="res_t_${resultClass}"${onClickFunc}>${result["text"]}</span>`
    }

    results.innerHTML += newResultsHtml;
}

function displayApiRequestError() {
    swal({
        title: translations.alert_error,
        text: translations.alert_error_api_request_message,
        icon: "error"
    });
}

btn_submit.addEventListener("click", function () {
    if (states.loading_result) {
        return
    }
    states.loading_result = true;
    console.log(states.loading_result)
    updateSubmitButtonState();

    clearOutput();
    makeApiRequest().then(r => {
        states.loading_result = false;
        updateSubmitButtonState();
    });
});
