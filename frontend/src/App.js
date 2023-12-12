import UserForm from "./Components/UserForm";
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import Userlist from "./Components/Userlist";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
<Routes>
  <Route path="/" element={  <UserForm/>}/>
  <Route path="/userlist" element={  <Userlist/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
