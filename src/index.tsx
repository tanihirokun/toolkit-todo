import React from 'react';
// TypeScript用の@types/react-dom/client"をインストール
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserAuth } from './pages/userAuth/UserAuth';



const root = ReactDOM.createRoot(
  // ここのas HTMLDivElementが重要なので覚える
  document.getElementById('root') as HTMLDivElement
)

root.render(
  <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
          <Routes>
            <Route path='/' element={ <App />}/>
            <Route path='/user-auth' element={ <UserAuth />}/>
          </Routes>
          </BrowserRouter>
        </Provider>
  </React.StrictMode>
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
