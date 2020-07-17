import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductComponent from "./components/Routes/ProductComponent"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Digiplug
      </header>
      <div className="App-body">
        <ProductComponent />
      </div>

    </div>
  );
}

export default App;
