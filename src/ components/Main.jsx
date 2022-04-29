import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SeachResult from "./SearchResult";
import NotFound from "./NotFound";
import axios from "axios";
import axiosJsonpAdapter from "axios-jsonp";

const Main = () => {
  const [location, setLocation] = useState(useLocation().state.location);

  // 検索範囲のステート
  const [range, setRange] = useState({
    value: 0,
    text: "",
  });
  const [resultData, setResultData] = useState({
    data: {},
    err: false,
  });

  // 洗濯中の検索範囲（表示用）
  // セレクトボックスの選択を取得して、APIを叩く処理
  const handleChangeRange = (e) => {
    const selectNum = Number(e.target.value);
    setRange({ value: e.target.value, text: e.target[selectNum].innerText });
  };

  // ホットペッパーグルメAPIの処理
  useEffect(() => {
    const url = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
    console.log("call api");

    axios
      .get(url, {
        adapter: axiosJsonpAdapter,
        params: {
          key: process.env.REACT_APP_API_KEY,
          lat: "34.67",
          lng: "135.52",
          // lat: location.latitude,
          // lng: location.longitude,
          range: range.value,
          count: "30",
          format: "jsonp",
        },
      })
      .then((res) => {
        console.log("resを表示");
        console.log(res);
        if (res.status === 200) {
          console.log("データ取得失敗");
          setResultData({ err: true });
        }
        if (res.state !== 200) {
          setResultData({ data: res.data.results, err: false });
        }
      })
      .catch((err) => console.log(err));
  }, [range]);

  const createSearchResult = () => {
    if (range.value !== 0 && resultData.err === false) {
      console.log("検索結果表示");
      return <SeachResult resultData={resultData.data} />;
    }
    if (range.value !== 0 && resultData.err === true) {
      return <NotFound />;
    }
  };

  const successCallback = (position) => {
    // 緯度.経度を取得
    console.log("サクセス");
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  // 取得に失敗した場合の処理
  const errorCallback = () => {
    console.log("位置情報が取得できませんでした");
    return (
      <div>
        <p>位置情報の取得に失敗しました...</p>
        <p>Topへ戻るボタンを押してください</p>
        <button>
          <Link to={`/`}>Topへ戻る</Link>
        </button>
      </div>
    );
  };

  const callGeolocateAPI = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  return (
    <div>
      <p>検索範囲：{range.text}</p>
      <select onChange={(e) => handleChangeRange(e)} size={1}>
        <option value="0">選択してください</option>
        <option value="1">300m</option>
        <option value="2">500m</option>
        <option value="3">1km</option>
        <option value="4">2km</option>
        <option value="5">3km</option>
      </select>
      <button
        onClick={() => {
          callGeolocateAPI();
        }}
      >
        位置情報の更新
      </button>
      {createSearchResult()}
    </div>
  );
};

export default Main;
