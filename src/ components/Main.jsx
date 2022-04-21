import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Main = () => {
  const location = useLocation().state.location;
  console.log(location);
  console.log(location.latitude);

  //console.log(location.latitude);
  return (
    <div>
      <p>Main Screen</p>
      <p id="lat"></p>
      <p id="lng"></p>
      <p>検索範囲の選択</p>
      <select id="range" size={1}>
        <option value="0" selected>
          選択してください
        </option>
        <option value="1">300m</option>
        <option value="2">500m</option>
        <option value="3">1km</option>
        <option value="4">2km</option>
        <option value="5">3km</option>
      </select>
    </div>
  );
};

export default Main;
