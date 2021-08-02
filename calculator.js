class Calculator {
    constructor(previousDisplayText, currentDisplayText) {
        this.previousDisplayText = previousDisplayText;
        this.currentDisplayText = currentDisplayText;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return

        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperator(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand != "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "x":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            default:
                return;
        }
        this.readyToReset = true;
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNum(number) {
        const strNum = number.toString()
        const integerDigits = parseFloat(strNum.split(".")[0])
        const decimalDigits = strNum.split(".")[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        }
        else {
            integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else {
            return integerDisplay
        }
    }
    update() {
        this.currentDisplayText.innerText = this.getDisplayNum(this.currentOperand);
        if (this.operation != null) {
            this.previousDisplayText.innerText = `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousDisplayText.innerText = "";
        }

    }
}

const numberButtons = document.querySelectorAll("[data-number")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalButton = document.querySelector("[data-equal]")
const percentButton = document.querySelector("[data-percent]")
const acButton = document.querySelector("[data-all-clear]")
const deleteButton = document.querySelector("[data-delete]")

const previousDisplayText = document.querySelector("[data-previous]")
const currentDisplayText = document.querySelector("[data-current]")

const calculator = new Calculator(previousDisplayText, currentDisplayText)

//  appendNumber() function buttons
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.update();
    });
});

//  chooseOperator() function buttons
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperator(button.innerText);
        calculator.update();
    });
});

equalButton.addEventListener("click", button => {
    calculator.compute();
    calculator.update();
});

acButton.addEventListener("click", button => {
    calculator.clear();
    calculator.update();
});

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.update();
})

