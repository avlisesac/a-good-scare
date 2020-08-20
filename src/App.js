import React from 'react';
import MainComponent from './components/MainComponent'
import './App.css'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

function App() {
  return (
  <Router>
    <div className="App">
      <MainComponent />
    </div>
  </Router>  
  );
}

export default App;
