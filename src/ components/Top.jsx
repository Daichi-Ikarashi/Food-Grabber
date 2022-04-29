import { Link } from "react-router-dom";
import { useState } from "react";

const Top = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  // 位置情報の許可状態を管理するステート
  // 初期：0　許可ボタン押した：1　取得中；2　許可なしor失敗；3　取得済み；4
  const [permission, setPermission] = useState(0);

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
    return <p>位置情報の取得に失敗しました。</p>;
  };

  const callGeolocateAPI = () => {
    setPermission(1); // 許可ボタンが押された状態
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  const createNextBtn = () => {
    if (permission !== 0) {
      if (location.latitude !== 0) {
        console.log(location);
        console.log("OK");
        return (
          <div>
            <button>
              <Link to={`/Main`} state={{ location: location }}>
                次へ
              </Link>
            </button>
            <p>位置情報を取得完了</p>
            <p>[次へ]ボタンを押してください</p>
          </div>
        );
      }
      if (location.latitude === 0) {
        return <p>位置情報の取得中...</p>;
      }
    }
  };

  return (
    <div className="main-container">
      <h1>Food Grabber</h1>
      <p>
        このアプリでは位置情報を使用します
        <br />
        同意いただける方は以下の「位置情報を許可する」を押してください。
      </p>
      <button onClick={() => callGeolocateAPI()}>許可する</button>
      {createNextBtn()}
    </div>
  );
};

export default Top;
