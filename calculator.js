function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operator(operator, num1, num2) {
    switch (operator) {
        case "add":
            let sum = add(num1, num2);
            currentNum = sum;

            console.log("current: " + currentNum);
            break;
        case "subtract":
            let difference = subtract(num1, num2);
            currentNum = difference;

            console.log("current: " + currentNum);
            break;
        case "multiply":
            let product = multiply(num1, num2);
            currentNum = product;

            console.log("current: " + currentNum);
            break;
        case "divide":
            let quotient = divide(num1, num2);
            currentNum = quotient;

            console.log("current: " + currentNum);
            break;
    }
}

//  global currentNum variable
let currentNum = 0;

