import { Link } from "react-router-dom";

const ShopDetail = (props) => {
  console.log(props.handleBackDetail);
  console.log(props.clickedShop);
  const shopData = props.clickedShop.shopDetail;
  const displayFlag = props.clickedShop.display;
  if (displayFlag) {
    return (
      <div>
        <h2>店舗詳細</h2>
        <div>
          <p>「{shopData.name}」</p>
          <p>住所:{shopData.address}</p>
          <p>営業時間:{shopData.open}</p>
          <p>定休日:{shopData.close}</p>
          <img src={shopData.photo.pc.l} alt="店の写真" />
          <button onClick={() => props.handleBackDetail()}>戻る</button>
        </div>
      </div>
    );
  } else {
    console.log("データロードなし");
  }
};

export default ShopDetail;
