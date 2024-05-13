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
const results = document.getElementById("results");
const results_block = document.getElementById("results_block");
const loading_animation = document.getElementById("loading_animation");

let states = {
    loading_texts: true,
    loading_result: false,
    last_used_method: 1,
};
let texts = [];
let request_results = [];
