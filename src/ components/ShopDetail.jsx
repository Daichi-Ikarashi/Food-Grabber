const ShopDetail = (props) => {
  // 親のshopDetailステートを取得
  const displayFlag = props.state.display;

  const detailData = props.state.detailData;
  if (displayFlag) {
    console.log(detailData);
    return (
      <div>
        <p>「{detailData.name}」</p>
        <p>ジャンル:{detailData.genre.name}</p>
        <p>住所:{detailData.address}</p>
        <p>営業時間:{detailData.open}</p>
        <p>定休日:{detailData.close}</p>
        <img src={detailData.photo.pc.l} alt="店の写真" />
        <button onClick={() => props.handleBackDetail()}>戻る</button>
      </div>
    );
  } else {
    console.log("データロードなし");
  }
};

export default ShopDetail;
