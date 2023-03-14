import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Nopage from "./Pages/Nopage/Nopage";
import Todo from "./Pages/Todo";
import Layout from "./Layout";
import AppContextProvider from "./context/appContext";



function App() {
  return (
    <div>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path="/todo" element={<Todo />}></Route>
              <Route path="/todo/:id" element={<Todo />}></Route>
            </Route>
            <Route path="*" element={<Nopage />}></Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
}

export default App;
