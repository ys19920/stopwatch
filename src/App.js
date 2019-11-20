import React from 'react';
import { Provider } from 'react-redux';
import Timer from './Components/Timer';
import Record from './Components/Record';
import store from './redux/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <header className='App-header'>
          <Timer />
          <Record />
        </header>
      </div>
    </Provider>
  );
}

export default App;
