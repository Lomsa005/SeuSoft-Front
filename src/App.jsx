import { HomePage, Layout } from './Components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Layout> <HomePage/></Layout>} />
      </Routes>
    </Router>
    </>
  )
}


export default App;
