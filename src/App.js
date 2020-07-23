import React from 'react';
import MainComponent from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configure';

const store = ConfigureStore();

function App() { 

  return (
  <Provider store={store}>
  <BrowserRouter>
    <div className="App">
      <MainComponent  />      
    </div>
  </BrowserRouter>
  </Provider>
  );
}

export default App;
