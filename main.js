const interior = document.querySelector(".interior.container");
const display = document.querySelector("#display");

let operand1 = null;
let operation = null;
let operand2 = null;

let newEntry = true;

const symbols = ['+/-', '%', '\u00f7', '7', '8', '9', '\u0078', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=']

for (let i = 0; i < 19; i++) {
    const button = document.createElement("div");
    button.classList.add("button")
    button.textContent = symbols[i - 1]


    if (i % 4 === 3) {
        button.addEventListener('click', () => {
            if (operand1 && operation) {
                operand2 = display.textContent
                operate(operand1, operation, operand2)
                operand1 = display.textContent;
                operation = button.textContent;
            
            } else {
                operand1 = display.textContent
                operation = button.textContent;
                
            }
            newEntry = true;
        })
    } else if (i === 0) {
        button.classList.add("clear-backspace-container");
        const delete_array = ["AC", "\u232b"]

        for (let i = 0; i < 2; i++) {
            const sub_button = document.createElement("div");
            sub_button.classList.add("button")
            sub_button.textContent = delete_array[i]

            sub_button.addEventListener('click', (event) => {
                updateDisplay(event.target.textContent)
                event.stopPropagation();
            })

            button.appendChild(sub_button)
        }
    } else {

        button.addEventListener('click', (event) => {
            updateDisplay(event.target.textContent)
        })
    }

    if (i === 16) {
        button.classList.add("zero-button");
    }

    interior.appendChild(button)
}

function updateDisplay(input) {

    if (newEntry) {
        display.textContent = "";
    }

    const curr_display = display.textContent;

    if ((!isNaN(input)) && curr_display.length < 9) {
        if (curr_display === "0" || newEntry) {
            display.textContent = input;
            newEntry = false;
        } else {
            display.textContent += input;
        } 
    }

    switch (input) {
        case 'AC':
            operand1 = null;
            operand2 = null;
            operation = null;
            display.textContent = "0";
            break;
        case '\u232b':
            display.textContent = curr_display.slice(0, -1)
            break;
        case '%':
            display.textContent = parseFloat((+(curr_display) / 100).toPrecision(10))
            break;
        case '+/-':
            display.textContent = -(+(curr_display));
            break;
        case '.':
            if (!curr_display.includes(".") && !operation) {
                display.textContent += ".";
            } else if (operation) {
                if (curr_display === operand1) {
                    display.textContent += "0.";
                }
                else {
                    display.textContent += ".";
                }
            }
            newEntry = false;
            break;
        case '=':
            if (operand1 && operation) {
                operand2 = curr_display;

                operate(operand1, operation, operand2);

                operand1 = null;
                operand2 = null;
                operation = null;
                
                newEntry = true;
            }
            
            break;
    }

    if (display.textContent === "") {
        display.textContent = 0;         
    }

}

function operate(op1, op, op2) {
    if (op1 && op2) {
        op1 = Number(op1);
        op2 = Number(op2);
        let result = 0;

        switch (op) {
            case "\u00f7":
                if (op2 === 0) {
                    result = "nope :)"
                } else {
                    result = op1 / op2;
                }
                
                break;
            case "\u0078":
                result = op1 * op2;
                break;
            case "-":
                result = op1 - op2;
                break;
            case "+":
                result = op1 + op2;
                break;
        }

        display.textContent = parseFloat(result.toPrecision(10)).toString().substring(0, 9);
    }
}

window.addEventListener('keydown', function(event) {
    const keyCode = event.keyCode;
    let key;

    const symbolCodes = [8, 13, 46, 53, 190];
    const opCodes = [56, 187, 189, 191]
    
    if (!event.shiftKey) {
        if (keyCode !== 189 && keyCode !== 191) {
            if (!isNaN(String.fromCharCode(keyCode) )&& keyCode !== 13) {
                key = String.fromCharCode(keyCode);
            } else if (symbolCodes.includes(keyCode)) {
                switch (keyCode) {
                    case 13:
                        key = "=";
                        break
                    case 46:
                        key = "AC";
                        break;
                    case 8:
                        key = "\u232b";
                        break;
                    case 190:
                        key = ".";
                        break;
            }
            }

            updateDisplay(key);

        } else {
            switch (keyCode) {
                case 189:
                    key = "-";
                    break;
                case 191:
                    key = "\u00f7";
                    break;
            }

            if (operand1 && operation) {
                operand2 = display.textContent
                operate(operand1, operation, operand2)
                operand1 = display.textContent;
                operation = key;
            
            } else {
                operand1 = display.textContent
                operation = key;
                
            }
            newEntry = true;
        }

        

    } else {
        if (opCodes.includes(keyCode)) {
            switch (keyCode) {
                case 56:
                    key = "\u0078";
                    break
                case 187:
                    key = "+";
                    break;
            }

            if (operand1 && operation) {
                operand2 = display.textContent
                operate(operand1, operation, operand2)
                operand1 = display.textContent;
                operation = key;
            
            } else {
                operand1 = display.textContent
                operation = key;
                
            }
            newEntry = true;

        } else if (keyCode === 191) {
            key = "/";
            updateDisplay(key);
        }
    }
        

        
    

})