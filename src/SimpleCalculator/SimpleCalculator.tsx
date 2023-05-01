import { useReducer } from 'react';

const numbers = Array(10)
  .fill(0)
  .map((_, i) => i);

type State = {
  number1: number;
  number2: number;
  result: number;
};

type Action =
  | {
      type: 'ADD';
    }
  | { type: 'MINUS' }
  | { type: 'RESET' }
  | { type: 'SET_NUM_1'; payload: number }
  | { type: 'SET_NUM_2'; payload: number };

const initialState: State = {
  number1: 0,
  number2: 0,
  result: 0,
};

const reducer = (state: State, action: Action) => {
  const actionType = action.type;
  switch (actionType) {
    case 'SET_NUM_1':
      return { ...state, number1: action.payload };
    case 'SET_NUM_2':
      return { ...state, number2: action.payload };
    case 'ADD':
      return { ...state, result: state.number1 + state.number2 };
    case 'MINUS':
      return { ...state, result: state.number1 - state.number2 };
    case 'RESET':
      return initialState;
  }
};

const SimpleCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <div>
        <h2>Select Number 1</h2>
        {numbers.map(number => (
          <button
            key={number + 'number 1'}
            onClick={() => dispatch({ type: 'SET_NUM_1', payload: number })}
          >
            {number}  
          </button>
        ))}
      </div>
      <div>
        <h2>Select Number 2</h2>
        {numbers.map(number => (
          <button
            key={number + 'number 2'}
            onClick={() => dispatch({ type: 'SET_NUM_2', payload: number })}
          >
            {number}
          </button>
        ))}
      </div>
      <div>
        <h2>Actions</h2>
        <div>
          <button onClick={() => dispatch({ type: 'ADD' })}>+</button>
          <button onClick={() => dispatch({ type: 'MINUS' })}>-</button>
          <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
        </div>
      </div>
      <h2>Results: {state.result}</h2>
    </>
  );
};

export default SimpleCalculator;
