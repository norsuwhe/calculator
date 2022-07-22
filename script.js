class Calculator {
  constructor() {
    this.inputDisplay = document.querySelector(".display__input");
    this.firstOperandTextValue = document.querySelector(".display__firstOperand");
    this.secondOperandTextValue = document.querySelector(".display__secondOperand");
    this.operatorTextValue = document.querySelector(".display__operator");
    this.result = document.querySelector('.display__result')
    this.firstOperand = "";
    this.secondOperand = "";
    this.operator = null;
    this.maximumInputLength = 31;
    this.textShrinkLength = 21;
    this.maximumResultLength = 11;
    this.setEvents();
  }

  updateInputDisplay() {
    this.firstOperandTextValue.textContent = this.firstOperand;
    this.operatorTextValue.textContent = this.operator;
    this.secondOperandTextValue.textContent = this.secondOperand;
  }

  addNumber(number) {
    if (this.firstOperand.length + this.secondOperand.length >= this.maximumInputLength) return;
    if (this.result.textContent) this.clearAll();
    if (number === '.') {
      if (this.operator === null && this.firstOperand.includes('.')) return
      if (this.operator && this.secondOperand.includes('.')) return;
    };
    if (number.includes('0') && this.firstOperand === '') return;
    if (this.operator === null) return (this.firstOperand = this.firstOperand + number);
    if (number.includes('0') && this.secondOperand === '') return;
    this.secondOperand = this.secondOperand + number;
  }

  addOperator(operator) {
    if (this.result.textContent) {
      this.firstOperand = this.result.textContent
      this.result.textContent = ''
    }
    if (this.firstOperand.length + this.secondOperand.length >= this.maximumInputLength) return;
    if (this.firstOperand === '') return;
    this.operator = operator;
  }

  clearAll() {
    this.firstOperand = '';
    this.secondOperand = '';
    this.operator = null;
    this.result.textContent = '';
  }

  delete() {
    if (this.firstOperand == '') return this.operator = null;
    if (this.secondOperand == '') return this.firstOperand = this.firstOperand.slice(0, -1)
    this.secondOperand = this.secondOperand.slice(0, -1);
  }

  plusMinus() {
    if (this.secondOperand !== '') {
      if (this.operator) return this.secondOperand = +this.secondOperand * -1;
    }
    this.firstOperand = +this.firstOperand * -1;
  }

  textShrink() {
    if (this.firstOperand.length + this.secondOperand.length >= this.textShrinkLength) {
      this.firstOperandTextValue.classList.add('display__firstOperand_font-small')
      this.operatorTextValue.classList.add('display__operator_font-small')
      this.secondOperandTextValue.classList.add('display__secondOperand_font-small')
    } else {
      this.firstOperandTextValue.classList.remove('display__firstOperand_font-small')
      this.operatorTextValue.classList.remove('display__operator_font-small')
      this.secondOperandTextValue.classList.remove('display__secondOperand_font-small')
    }
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
    if (computedResult.toString().length >= this.maximumResultLength) {
      this.result.classList.add('font-small')
    } else { this.result.classList.remove('font-small') }
    this.result.textContent = parseFloat(computedResult.toFixed(6));
    this.firstOperand = ''
    this.operator = null
    this.secondOperand = ''
  }

  setEvents() {
    const buttons = document.querySelector(".number-pad");
    buttons.addEventListener("click", (e) => {
      if (e.target.classList.contains("number-pad__operand")) {
        this.addNumber(e.target.textContent);
        this.updateInputDisplay();
        this.textShrink();
      }
      if (e.target.classList.contains("number-pad__operator")) {
        this.addOperator(e.target.textContent);
        this.updateInputDisplay();
      }
      if (e.target.classList.contains("number-pad__equal")) {
        if (this.operator === null) return;
        this.calculate();
        this.updateInputDisplay();
      }
      if (e.target.classList.contains("number-pad__clear-all")) {
        this.clearAll();
        this.updateInputDisplay();
      }
      if (e.target.classList.contains("number-pad__delete")) {
        this.delete();
        this.updateInputDisplay();
        this.textShrink();
      }
      if (e.target.classList.contains("number-pad__plus-minus")) {
        this.plusMinus();
        this.updateInputDisplay();
      };
    });
  }
}

const calculator = new Calculator();
