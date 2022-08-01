class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
    };

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    };

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        if(this.currentOperand === undefined){
            this.currentOperand = number.toString(); 
        }else{
            this.currentOperand = this.currentOperand.toString() +
             number.toString();   
        }
    }
    
    appendOperation(operation) {
        if(this.currentOperand === "") return
    
        if(this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = " "
    }
    
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev)|| isNaN(current)) return  
        
        switch(this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }
    /* 
    * this method makes the display show like actual numbers.
    e.g the commas that are given after 3 digits etc.
    TODO: I have to complete this functionality later
    */

    // getDisplayValue(number){
    //     console.log(number)
    //     const stringNumber = number.toString()
    //     const integerNumber = parseFloat(stringNumber.split('.')[0])
    //     const decimalNumber = stringNumber.split('.')[1]
    //     let integerDisplay
    //     if(isNaN(integerNumber)) {
    //         integerNumber
    //     } else {
    //         integerDisplay = integerNumber.toLocaleString('en',{
    //         maximumFractionDigits: 0})
    //     }
    //     if(decimalNumber == undefined){
    //         return integerDisplay
    //     }
    //     if(decimalNumber !== null) {
    //         return `${integerDisplay}.${decimalNumber}`
    //     }else{
    //         return integerDisplay
    //     }
    // }
    
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.previousOperand === undefined) {
            this.previousOperand = ""
        }

        // if(this.operation !== undefined){
        //     this.previousOperandTextElement.innerText = 
        //     `${this.previousOperand} ${this.operation}`
        // }
        if(this.operation !== undefined){
            this.previousOperandTextElement.innerText = 
            `${this.previousOperand} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = this.previousOperand
        }
        

        
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = 
            document.querySelector('[data-previous-operand]')
const currentOperandTextElement = 
            document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,
    currentOperandTextElement);
    
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    });
    
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendOperation(button.innerText)
        calculator.updateDisplay()
    });  
})


equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})