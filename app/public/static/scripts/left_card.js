function updateSubmitButtonState() {
    if (states.loading_result) {
        btn_submit.setAttribute("style", "display: none;");
        btn_cancel_request.removeAttribute("style");
        btn_cancel_request.removeAttribute("disabled");
        return;
    }
    btn_cancel_request.setAttribute("style", "display: none;");
    btn_submit.removeAttribute("style");

    if (
        (textarea.value === "")
        || (btn_dropdown_method.innerHTML !== btn_method_1.innerHTML && btn_dropdown_method.innerHTML !== btn_method_2.innerHTML)
    ) {
        btn_submit.setAttribute("disabled", "");
    } else {
        btn_submit.removeAttribute("disabled");
    }
}

function updateRangeValue() {
    if (btn_dropdown_method.innerHTML === btn_method_1.innerHTML) {
        range_value.innerHTML = range.value;
    } else {
        range_value.innerHTML = (1 - parseInt(range.value) * 0.05).toFixed(2);
    }
}

function displayPrepreparedTextsNotLoadedError() {
    swal({
        title: translations.alert_wait,
        text: translations.alert_wait_preprepared_texts_message,
        icon: "warning"
    });
}

async function loadPrepreparedTexts() {
    for (let i = 0; i < 3; i++) {
        let response;
        do {
            response = await fetch(`/public/static/texts/${i + 1}.txt`);
        } while (!response.ok);
        texts.push(await response.text());
    }
    states.loading_texts = false;
}

loadPrepreparedTexts();


function displayTextCopyrightMessage(textId) {
    let copyrightMessageBox = document.createElement("div");
    copyrightMessageBox.innerHTML = `
        <div>${translations.copyright}</div>
        <div class="mt-2">${translations.author}: ${translations.authors_names[textId]}</div>
    `;

    swal({
        content: copyrightMessageBox,
        buttons: {
            visit: {
                text: translations.btn_visit_site,
                value: "visit",
            },
            confirm: true,
        }
    })
        .then((value) => {
            if (value === "visit")
                window.open(text_links[textId], '_blank').focus();
        });
}


textarea.addEventListener("input", function () {
    updateSubmitButtonState();
});

btn_preprepared_text_1.addEventListener("click", function () {
    if (states.loading_texts) {
        displayPrepreparedTextsNotLoadedError();
    } else {
        textarea.value = texts[0];
        textarea.scrollTop = 0;
        updateSubmitButtonState();
    }
    displayTextCopyrightMessage(0);
});
btn_preprepared_text_2.addEventListener("click", function () {
    if (states.loading_texts) {
        displayPrepreparedTextsNotLoadedError();
    } else {
        textarea.value = texts[1];
        textarea.scrollTop = 0;
        updateSubmitButtonState();
    }
    displayTextCopyrightMessage(1);
});
btn_preprepared_text_3.addEventListener("click", function () {
    if (states.loading_texts) {
        displayPrepreparedTextsNotLoadedError();
    } else {
        textarea.value = texts[2];
        textarea.scrollTop = 0;
        updateSubmitButtonState();
    }
    displayTextCopyrightMessage(2);
});

btn_method_1.addEventListener("click", function () {
    btn_dropdown_method.innerHTML = btn_method_1.innerHTML;

    range_label_placeholder.setAttribute("style", "display: none;");
    range_label_type_2.setAttribute("style", "display: none;");
    range_label_type_1.removeAttribute("style");

    range.removeAttribute("disabled");
    range.value = 1;

    updateRangeValue();
    updateSubmitButtonState();
});
btn_method_2.addEventListener("click", function () {
    btn_dropdown_method.innerHTML = btn_method_2.innerHTML;

    range_label_placeholder.setAttribute("style", "display: none;");
    range_label_type_1.setAttribute("style", "display: none;");
    range_label_type_2.removeAttribute("style");

    range.removeAttribute("disabled");
    range.value = 1;

    updateRangeValue();
    updateSubmitButtonState();
});

range.addEventListener("change", function () {
    updateRangeValue();
});
