import { HomePage, Layout } from './Components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from './Components/Api/Api';
import { LanguageProvider } from './Components/Common/LanguageContext';
import NotFound from './Components/Common/NotFound';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LanguageProvider><DataProvider><Layout> <HomePage/></Layout></DataProvider></LanguageProvider>} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
