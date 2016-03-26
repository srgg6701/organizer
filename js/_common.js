/**
 * Вернуть выборку (id, классы, селекторы, селектор)
 * @param param
 * @param isSelector
 * @returns {*}
 */
function el(param, isSelector){
    switch (isSelector) {
        case 1:
            return document.getElementsByClassName(isSelector);
            break;
        case 2:
            return document.querySelectorAll(isSelector);
            break;
        case 3:
            return document.querySelector(isSelector);
            break;
        default:
            return document.getElementById(param);
    }
}