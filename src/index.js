import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import store from './store'
import './bootstrap.min.css';
import './index.css';
import App from './App';  
import { HashRouter  } from "react-router-dom";
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV === 'production'){
  disableReactDevTools()
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <HashRouter>
            <App />
      </HashRouter>
  </Provider>
);



