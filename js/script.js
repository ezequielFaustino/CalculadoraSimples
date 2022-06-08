//pegar elemetos por id
const previousOperationText = document.getElementById('previous-operation');
const currentOperationText = document.getElementById('current-operation');
const buttons = document.querySelectorAll("#buttons-container button");

//console.log(buttons);

//Classe Calculator
class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = ""; //o valor q for digitado
    }

    //se for digitado, tem q aparecer na tela da calc
    addDigit(digit){
        //console.log(digit);
        //se operacao atual ja tem um ponto
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //processar todas operacoes da calculadora
    processOperation(operation){
        //console.log(operation);

        //checar se current value esta vazio
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            //mudar as operacoes
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }

        //pegar valor current e previous
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText; // + transforma variavel em Number

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualsOperator();
                break;
            default:
                return; //operacao nao eh valida
        }
    }

    //mudar os numeros na tela da calc
    updateScreen(operationValue = null, operation = null, current = null, previous = null){
        //console.log(operationValue, operation, current, previous);

        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation; 
        }else{
          //checar se o valor for zero, se for add current value
          if(previous === 0){
              operationValue = current;
          }
          
          //add current value para o previous
          this.previousOperationText.innerText = `${operationValue} ${operation}`;
          this.currentOperationText.innerText = "";
        }
    }

    //mudar os operadores matematicos
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"];

        //se nao for nenhuma operacao matematica
        if(!mathOperations.includes(operation)){
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //deletar o ultimo digito
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0,-1);
    }

    //deletar toda a current operation
    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    }

    //deletar todas as operações
    processClearOperation(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //processar uma operacao
    processEqualsOperator(){
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

//target do botao clicado
buttons.forEach((btn) =>{
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;
        //console.log(value);

        //se valor numerico ou operação
        if( (+value >= 0) || (value === ".")){
            calc.addDigit(value);
        }else{
            calc.processOperation(value);
        }
    })
})
