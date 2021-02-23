import React from 'react';
import { Button } from './components/Button';

import './style/global.css';

function App() {
  return (
    <div>
      <Button color="green">
        Botão 1
      </Button>
      <Button color="blue">
        Botão 2
      </Button>
      <Button color="red">
        Botão 3
      </Button>
    </div>
  );
}

export default App;
