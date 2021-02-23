/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';

 interface ButtonProps {
   color: string,
   children: string
 }

// eslint-disable-next-line import/prefer-default-export
export function Button(props: ButtonProps) {
  const [counter, setCounter] = useState(1);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <button
      type="button"
      style={{ backgroundColor: props.color }}
      onClick={increment}
    >
      {props.children}
      {' '}
      <strong>{counter}</strong>
    </button>
  );
}
