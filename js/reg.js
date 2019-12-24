export default {
    pwd:/^[\da-zA-Z]{6,12}$/,
    phone: /^1[\d]{10}$/,
    //正整数
    uintno0: /^[0-9]*[1-9][0-9]*$/,
    //自然数
    uint: /^\d+$/,
    //正浮点数
    ufloatno0: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
    //非负负担书
    ufloat: /^\d+(\.\d+)?$/,
}