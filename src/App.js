import React from 'react';
import { Provider } from 'react-redux';
import  {GlobalStyled} from './style.js';
import Header from "./common/header";
import {Iconfont} from "./statics/iconfont/iconfont";
import store from './store';

function App() {
  return (
    <div className="App">
      <GlobalStyled />
      <Iconfont />
      <Provider store={store}>
        <Header></Header>
      </Provider>
    </div>
  );
}

export default App;
