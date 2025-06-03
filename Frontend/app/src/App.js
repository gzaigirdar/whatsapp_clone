
import { CallIcon,DocumentIcon} from './svg'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './Pages/Home.js'
import Login from './Pages/Login.js';
import Register from './Pages/Register.js'
import { logout } from './features/userSlice.js';
function App() {
  const dispatch = useDispatch();
  return (
    <div>
          <button onClick={()=> dispatch(logout())}> logout </button>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Register/>}/>
            <Route exact path="/Register" element={<Register/>} />



          
          </Routes>
        </Router>
    </div>
  );
}

export default App;
