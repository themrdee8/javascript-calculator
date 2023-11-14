import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  }

  const buttonClick = (symbol: string) => {

    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    }

    else if (symbol === "negative") {

      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    }

    else if (symbol === "percentage") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    }

    else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    }

    else if (symbol === "=" ) {
      calculate();
    }

    else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol)
      }
    }

    else if (symbol === ".") {
    const lastNumber = expression.split(/[-+*/]/g).pop();
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    }

    else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } 
      else {
        setExpression(expression + symbol);
      }
    }
  }


  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;

    const parts = et.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i -1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      }
      else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");

    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string)
    }
    else {
      setAnswer(eval(newExpression) as string)
    }
    setExpression("");
  };


  return (
   <div className="container">
    <h1>Calculator App</h1>
    <div id="calculator">
      <div id="display">
        <div id="answer">{answer}</div>
        <div id="expression">{expression}</div>
      </div>

      <button 
        onClick={() => buttonClick("clear")} 
        className="light-gray" 
        id="clear"
      >
        AC
      </button>

      <button 
        onClick={() => buttonClick("negative")} 
        id="negative" 
        className="light-gray"
      >
        +/-
      </button>

      <button 
        onClick={() => buttonClick("%")} 
        className="light-gray" 
        id="percentage"
      >
        %
      </button>

      <button 
        onClick={() => buttonClick("/")} 
        className="yellow" 
        id="divide"
      >
        /
      </button>

      <button 
        onClick={() => buttonClick("7")} 
        className="black-gray" 
        id="seven"
      >
        7
      </button>

      <button 
        onClick={() => buttonClick("8")} 
        className="black-gray" 
        id="eight"
      >
        8
      </button>

      <button 
        onClick={() => buttonClick("9")} 
        className="black-gray" id="nine"
      >
        9
      </button>

      <button 
        onClick={() => buttonClick("*")} 
        className="yellow" 
        id="multiply"
      >
        x
      </button>

      <button 
        onClick={() => buttonClick("4")} 
        className="black-gray" 
        id="four"
      >
        4
      </button>

      <button 
        onClick={() => buttonClick("5")} 
        className="black-gray" 
        id="five"
      >
        5
      </button>

      <button 
        onClick={() => buttonClick("6")} 
        className="black-gray" 
        id="six"
      >
        6
      </button>

      <button 
        onClick={() => buttonClick("-")} 
        className="yellow" 
        id="subtract"
      >
        -
      </button>
      
      <button 
        onClick={() => buttonClick("1")} 
        className="black-gray" 
        id="one"
      >
        1
      </button>

      <button 
        onClick={() => buttonClick("2")} 
        className="black-gray" 
        id="two"
      >
        2
      </button>

      <button 
        onClick={() => buttonClick("3")} 
        className="black-gray" 
        id="three"
      >
        3
      </button>

      <button 
        onClick={() => buttonClick("+")} 
        className="yellow" 
        id="add"
      >
        +
      </button>

      <button 
        onClick={() => buttonClick("0")} 
        className="black-gray" 
        id="zero"
      >
        0
      </button>

      <button 
        onClick={() => buttonClick(".")}
        className="black-gray" 
        id="decimal"
      >
        .
      </button>

      <button 
        onClick={() => buttonClick("=")} 
        className="yellow" 
        id="equals"
        >
          =
        </button>
      
    </div>
   </div>
  )
}

export default App
