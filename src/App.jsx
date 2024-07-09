import { HomePage, AboutUs } from './Components/Front';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Admin } from './Components/Admin/Admin';


function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/aboutUs" element={<AboutUs/>} />
        <Route path="/Admin" element={<Admin/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
