
import { CallIcon,DocumentIcon} from './svg'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux';
import Home from './Pages/Home.js'
import Login from './Pages/Login.js';
import Register from './Pages/Register.js'
import { logout } from './features/userSlice.js';
import {PersistStore} from './ReduxStore/store.js'
function App() {
  

  return (
    <div className='dark'>
          
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>} />



          
          </Routes>
        </Router>
    </div>
  );
}

export default App;
