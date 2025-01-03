import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./screens/home/Home";
import Createpost from "./screens/create/Createpost";
import Postdetails from "./screens/postdetail/Postdetails";
import Editpost from "./screens/editpost/Editpost";
import Themeswitch from "./components/switch/Themeswitch";
import { useThemeContext } from "./hooks/useThemeContext";
import './App.css';

function App() {
  const {theme} = useThemeContext();
  return (
    <div className={`${theme}bg`}>
      <BrowserRouter>
      <Navbar />
      <Themeswitch/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create" element={<Createpost/>} />
        <Route path="/post/:id" element={<Postdetails/>} />
        <Route path="/edit/:id" element={<Editpost/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
