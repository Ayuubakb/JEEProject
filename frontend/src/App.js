import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import LandingPage from './Pages/LandingPage';
import store from './store';
import {Provider} from "react-redux"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/auth'>
              <Route path='login' element={<Login/>}/>
              <Route path='signup' element={<Signup/>}/>
          </Route>
        </Routes>
      </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
