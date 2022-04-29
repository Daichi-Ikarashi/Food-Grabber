import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./ components/Top";
import Main from "./ components/Main";
import ShopDetail from "./ components/ShopDetail";
import NoMatch from "./ components/NoMatch";
import Credit from "./ components/Credit";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/Top" element={<Top />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/ShopDetail" element={<ShopDetail />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
      <Credit />
    </div>
  );
};

export default App;
