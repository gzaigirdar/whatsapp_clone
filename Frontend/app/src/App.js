
import { CallIcon,DocumentIcon} from './svg'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home.js'
import Login from './Pages/Login.js';
import Register from './Pages/Register.js'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Register/>}/>
        <Route exact path="/Register" element={<Register/>} />



      
      </Routes>
    </Router>
  );
}

export default App;
