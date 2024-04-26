let expression = '';
let history = document.getElementById('history');
let resultInput = document.getElementById('result');
let calculationHistory = []; 

function addToResult(value) {
  expression += value;
  resultInput.value = expression;
}

function calculateResult() {
  try {
    let result = eval(expression);
    if (result === Infinity || result === -Infinity) {
      throw new Error('Cannot divide by zero');
    }
    history.innerHTML += `${expression} = ${result}<br>`;
    calculationHistory.push({ expression: expression, result: result });
    expression = result; // Store the result for further calculations
    resultInput.value = result;
  } catch (error) {
    resultInput.value = 'Error: ' + error.message;
  }
}

function clearResult() {
  if (expression !== '') {
    history.innerHTML += '<hr class="computation-divider">'; 
  }
  expression = '';
  resultInput.value = '';
}

function deleteLast() {
  expression = expression.slice(0, -1);
  resultInput.value = expression;
}

