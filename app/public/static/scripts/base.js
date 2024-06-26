const textarea = document.getElementById("textarea");
const btn_preprepared_text_1 = document.getElementById("btn_preprepared_text_1");
const btn_preprepared_text_2 = document.getElementById("btn_preprepared_text_2");
const btn_preprepared_text_3 = document.getElementById("btn_preprepared_text_3");
const btn_dropdown_method = document.getElementById("btn_dropdown_method");
const btn_method_1 = document.getElementById("btn_method_1");
const btn_method_2 = document.getElementById("btn_method_2");
const range_label_placeholder = document.getElementById("range_label_placeholder");
const range_label_type_1 = document.getElementById("range_label_type_1");
const range_label_type_2 = document.getElementById("range_label_type_2");
const range_value = document.getElementById("range_value");
const range = document.getElementById("range");
const btn_submit = document.getElementById("btn_submit");
const btn_cancel_request = document.getElementById("btn_cancel_request");
const results = document.getElementById("results");
const results_block = document.getElementById("results_block");
const loading_animation = document.getElementById("loading_animation");
const btn_correct_all = document.getElementById("btn_correct_all");
const btn_rollback_corrections = document.getElementById("btn_rollback_corrections");
const btn_save_to_file = document.getElementById("btn_save_to_file");
const text_links = [
    "https://zviazda.by/be/news/20220121/1642766032-arhitektar-yaki-stvaryu-siluet-belaruskay-stalicy",
    "https://zviazda.by/be/news/20181121/1542815962-belaruskaya-carkva-u-londane-naminavana-na-zvanne-naylepshaga-budynka",
    "https://zviazda.by/be/news/20210504/1620146423-yaki-budze-karaleuski-palac-u-starym-zamku"
]

let states = {
    loading_texts: true,
    loading_result: false,
    last_used_method: -1,
    cancelling_request: false,
};
let texts = [];
let request_results = [];

function updateButtonsStates() {
    updateSubmitButtonState();
    updateResultButtonsStates();
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
