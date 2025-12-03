import { useState } from 'react';

type Operator = '+' | '-' | '*' | '/' | null;

const Calculator = () => {
  const [display, setDisplay] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(false);

  const handleNumberClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimalClick = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperatorClick = (nextOperator: Operator) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);
      
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperator(nextOperator);
  };

  const calculate = (firstValue: number, secondValue: number, operator: Operator): number => {
    switch (operator) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operator) {
      const newValue = calculate(previousValue, inputValue, operator);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleToggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const Button = ({ 
    value, 
    onClick, 
    className = '', 
    colspan = false 
  }: { 
    value: string; 
    onClick: () => void; 
    className?: string; 
    colspan?: boolean;
  }) => (
    <button
      onClick={onClick}
      className={`
        ${colspan ? 'col-span-2' : ''}
        ${className}
        h-16 rounded-lg font-semibold text-lg
        transition-all duration-150
        hover:brightness-110 active:brightness-90
        shadow-md hover:shadow-lg
      `}
    >
      {value}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-6 w-full max-w-sm">
        <div className="mb-6">
          <div className="bg-gray-800 rounded-xl p-6 text-right">
            <div className="text-gray-400 text-sm mb-1 h-6">
              {previousValue !== null && operator && `${previousValue} ${operator}`}
            </div>
            <div className="text-white text-5xl font-light overflow-x-auto">
              {display}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Button
            value="C"
            onClick={handleClear}
            className="bg-gray-600 text-white"
          />
          <Button
            value="±"
            onClick={handleToggleSign}
            className="bg-gray-600 text-white"
          />
          <Button
            value="%"
            onClick={handlePercentage}
            className="bg-gray-600 text-white"
          />
          <Button
            value="÷"
            onClick={() => handleOperatorClick('/')}
            className="bg-orange-500 text-white"
          />

          <Button
            value="7"
            onClick={() => handleNumberClick('7')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="8"
            onClick={() => handleNumberClick('8')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="9"
            onClick={() => handleNumberClick('9')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="×"
            onClick={() => handleOperatorClick('*')}
            className="bg-orange-500 text-white"
          />

          <Button
            value="4"
            onClick={() => handleNumberClick('4')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="5"
            onClick={() => handleNumberClick('5')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="6"
            onClick={() => handleNumberClick('6')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="−"
            onClick={() => handleOperatorClick('-')}
            className="bg-orange-500 text-white"
          />

          <Button
            value="1"
            onClick={() => handleNumberClick('1')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="2"
            onClick={() => handleNumberClick('2')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="3"
            onClick={() => handleNumberClick('3')}
            className="bg-gray-700 text-white"
          />
          <Button
            value="+"
            onClick={() => handleOperatorClick('+')}
            className="bg-orange-500 text-white"
          />

          <Button
            value="0"
            onClick={() => handleNumberClick('0')}
            className="bg-gray-700 text-white"
            colspan
          />
          <Button
            value="."
            onClick={handleDecimalClick}
            className="bg-gray-700 text-white"
          />
          <Button
            value="="
            onClick={handleEquals}
            className="bg-orange-500 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
