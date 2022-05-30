import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import App from './App';

import PageHome from "./components/PageHome";
import PageProfile from "./components/PageProfile";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<PageHome />} />
        <Route path="profile" element={<PageProfile />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
