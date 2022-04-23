import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SeachResult from "./SearchResult";
import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp";

const Main = () => {
  const location = useLocation().state.location;
  console.log(location);
  console.log(location.latitude);
  console.log(typeof location.latitude);

  console.log("latを文字列にしたい");
  const lat = String(location.latitude);
  const lng = String(location.longitude);
  console.log(lat);
  console.log(lng);

  const [range, setRange] = useState(0);

  const handleChange = (e) => {
    setRange({ range: Number(e.target.value) });
    callApi();
  };

  const [shopData, setShopData] = useState({});

  const callApi = async () => {
    console.log("call api");
    const url = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
    await axios
      .get(url, {
        adapter: axiosJsonpAdapter,
        params: {
          key: process.env.REACT_APP_API_KEY,
          lat: "39.70178368094897",
          lng: "141.136676727607",
          // なんかよくわからないけど、
          // 現在地、岩手県滝沢市だとデータヒットしない笑
          // 田舎だからっぽい
          // 盛岡駅 39.70178368094897, 141.136676727607
          // 39.7766622, 141.1341492
          // 39.776655797331266, 141.13426742159413
          range: String(range.range),
          count: "30",
          format: "jsonp",
        },
      })
      .then((res) => {
        const result = res.data.results;
        console.log(result);
        setShopData(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>Main Screen</p>
      <p id="lat"></p>
      <p id="lng"></p>
      <p>検索範囲の選択</p>
      <select onChange={(e) => handleChange(e)} size={1}>
        <option value="0">選択してください</option>
        <option value="1">300m</option>
        <option value="2">500m</option>
        <option value="3">1km</option>
        <option value="4">2km</option>
        <option value="5">3km</option>
      </select>
      <SeachResult shopData={shopData} />
    </div>
  );
};

export default Main;
