import { Link } from "react-router-dom";
import { useState } from "react";

const Top = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  function successCallback(position) {
    // 緯度.経度を取得
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  // 取得に失敗した場合の処理
  function errorCallback(error) {
    console.log("位置情報が取得できませんでした");
  }

  return (
    <div className="main-container">
      <h1>Food Grabber</h1>
      <p>App description</p>
      <p>
        このアプリでは位置情報を使用します。
        <br />
        同意いただける方は以下の「位置情報を許可する」を押してください。
      </p>
      <button
        onClick={navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback
        )}
      >
        <Link to={`/Main`} state={{ location: location }}>
          許可する
        </Link>
      </button>
    </div>
  );
};

export default Top;
