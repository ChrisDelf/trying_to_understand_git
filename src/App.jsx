import React, { useEffect, useState } from "react";
import "./styles/App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import LoginPage from "./features/loginPage/LoginPage";
import HomePage from "./features/homePage/HomePage";
import MenuBar from "./features/homePage/MenuBar";
import DownloadPage from "./features/homePage/downloadPage/DownloadPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/homepage" element={<HomePage />} />
        <Route exact path="/download" element={<DownloadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
