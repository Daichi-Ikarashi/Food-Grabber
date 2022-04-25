import { useState } from "react";
import ShopDetail from "./ShopDetail";

const SeachResult = (props) => {
  console.log("受け取りました");

  const shopData = props.shopData;
  console.log(shopData);

  const [clickedShop, setClickedShop] = useState({
    shopDetail: {},
    display: false,
  });

  // 受け取ったprops（object型）を
  // 店舗単位の配列に変換
  const shopsArray = [];
  for (let i = 0; i < shopData.results_returned; i++) {
    shopsArray.push(shopData.shop[i]);
  }
  // 店舗ごとのデータをHTMLのリスト要素に格納
  const listItems = shopsArray.map((d) => (
    <li key={d.id}>
      <button id={d.id} onClick={(e) => handleClickDetail(e)}>
        詳細
      </button>
      店舗名：{d.name}
      アクセス：{d.access}
      ロゴ：
      <img src={d.logo_image} alt="logo" />
    </li>
  ));

  // 店舗詳細ボタンが押されたとき、そのIDを取得して
  // ClickedShopのステートを変える
  const handleClickDetail = (e) => {
    console.log(e.target.id);
    getClickedShopData(e.target.id);
  };

  // 店舗詳細表示中に戻るボタンが押された時のstateの変更
  const handleBackDetail = () => {
    console.log("handleBackDetailを実行");
    setClickedShop({
      display: false,
    });
  };

  const getClickedShopData = (shopId) => {
    for (let i = 0; i < shopData.results_returned; i++) {
      if (shopId === shopsArray[i].id) {
        setClickedShop({
          shopDetail: shopsArray[i],
          display: true,
        });
      }
    }
  };

  return (
    <div className="result-container">
      <h2>検索結果を表示するコンポーネント</h2>
      <p>propsを受け取って、とりあえず表示</p>
      <ul>{listItems}</ul>
      <ShopDetail
        clickedShop={clickedShop}
        handleBackDetail={() => handleBackDetail()}
      />
    </div>
  );
};

export default SeachResult;
