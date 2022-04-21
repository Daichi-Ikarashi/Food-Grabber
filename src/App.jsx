import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./ components/Top";
import Main from "./ components/Main";
import ShopDetail from "./ components/ShopDetail";
import NoMatch from "./ components/NoMatch";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Top />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/ShopDetail" element={<ShopDetail />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
