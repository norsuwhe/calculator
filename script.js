class Calculator {
  constructor() {
    this.inputDisplay = document.querySelector(".calculator__input");
    this.firstOperandTextValue = document.querySelector(
      ".calculator__firstOperand"
    );
    this.secondOperandTextValue = document.querySelector(
      ".calculator__secondOperand"
    );
    this.operatorTextValue = document.querySelector(".calculator__operator");
    this.result = document.querySelector('.calculator__result')
    this.firstOperand = "";
    this.secondOperand = "";
    this.operator = null;
    this.setEvents();
  }
  updateInputDisplay() {
    this.firstOperandTextValue.textContent = this.firstOperand;
    this.operatorTextValue.textContent = this.operator;
    this.secondOperandTextValue.textContent = this.secondOperand;
  }

  addNumber(number) {
    if (this.operator === null)
      return (this.firstOperand = this.firstOperand + number);
    this.secondOperand = this.secondOperand + number;
  }

  addOperator(operator) {
    this.operator = operator;
  }

  clearAll() {
    this.firstOperand = '';
    this.secondOperand = '';
    this.operator = null;
  }
calculate() {
    let computedResult;
    const first = parseFloat(this.firstOperand)
    const second = parseFloat(this.secondOperand)
    switch (this.operator) {
        case '/':
        computedResult = first / second
        break
        case '*':
        computedResult = first * second
        break
        case '-':
        computedResult = first - second
        break
        case '+':
        computedResult = first + second
        break
        default: 
         return;
    }
    this.result.textContent = computedResult;
}

  setEvents() {
    const buttons = document.querySelector(".number-pad");
    buttons.addEventListener("click", (e) => {
      if (e.target.classList.contains("number-pad__operand")) {
        this.addNumber(e.target.textContent);
        this.updateInputDisplay();
      }
      if (e.target.classList.contains("number-pad__operator")) {
        this.addOperator(e.target.textContent);
        this.updateInputDisplay();
      }
      if (e.target.classList.contains("number-pad__equal")) {
        if (this.operator === null) return;
        this.calculate();
        this.clearAll();
      }
      if (e.target.classList.contains("number-pad__clear-all")){
        this.clearAll();
        this.updateInputDisplay();
      }
    });
  }
}

const calculator = new Calculator();
