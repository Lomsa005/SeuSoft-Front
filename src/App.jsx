import { HomePage, Layout } from './Components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from './Components/Api/Api';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<DataProvider><Layout> <HomePage/></Layout></DataProvider>} />
      </Routes>
    </Router>
    </>
  )
}


export default App;
