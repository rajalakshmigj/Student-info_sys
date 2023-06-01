import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
// import moment from 'moment';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/addstd" Component={AddEdit} />
          <Route path="/update/:id" Component={AddEdit} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
