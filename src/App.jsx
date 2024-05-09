import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./components/pages/Home";
import { IoIosMoon } from "react-icons/io";
import Tokens from "./components/pages/Tokens";

function App() {
  const [count, setCount] = useState(0);
  const toggleBulb = (e) => {
    // console.log(e.target);
    // navRef.current.classList.toggle("on");
    const root = document.documentElement; // Get the root element of the document
    // Get the computed styles of the document's root element
    const rootStyles = getComputedStyle(root);
    // Retrieve the values of the CSS custom properties
    const bgColor = rootStyles.getPropertyValue("--bg");
    const textColor = rootStyles.getPropertyValue("--text");
    const bxs1 = rootStyles.getPropertyValue("--bxShadow");
    const bxs2 = rootStyles.getPropertyValue("--bxShadow2");
    // Swap the values of --bg and --text
    root.style.setProperty("--bg", textColor);
    root.style.setProperty("--text", bgColor);
    root.style.setProperty("--bxShadow", bxs2);
    root.style.setProperty("--bxShadow2", bxs1);
  };
  return (
    <BrowserRouter>
    <div className="container">
    <nav>
        <Link to="/" className="logo">MEMESLAND</Link>
        <IoIosMoon className="bulb"onClick={toggleBulb}/>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/tokens/:id/:addr" element={<Tokens/>}/>
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
