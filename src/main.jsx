import React from "react";
import ReactDOM from "react-dom/client";
import "./presentation.css";
import SlidePresentation from "../libra_ppt_web_presentation.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SlidePresentation />
  </React.StrictMode>
);
