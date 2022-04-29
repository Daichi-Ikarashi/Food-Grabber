import { useEffect, useState } from "react";
import ShopDetail from "./ShopDetail";

const ShopList = (props) => {
  console.log("shopListだよ!!!");
  console.log(props);
  const displayList = props.displayList;

  // 親コンポーネントから受け取った30件のデータのうち、
  // 任意の10件を表示用に格納するリスト
  const [shopArray, setShopArray] = useState({
    listData: [],
    display: false,
  });

  // 詳細ボタンが押されたとき、その店舗情報を格納するステート
  const [shopDetail, setShopDetail] = useState({
    detailData: [],
    display: false,
  });

  useEffect(() => {
    transList();
    createList();
  }, []);

  const transList = (page) => {
    const data = [];
    let i = 0;
    // 初回用pageが指定されていない
    if (!page) {
      for (i = 0; i < 10; i++) {
        data.push(displayList[i][1]);
      }
    }
    // pageボタンがクリックされたとき 引数(page)があるとき
    else {
      for (i = (page - 1) * 10; i < page * 10; i++) {
        data.push(displayList[i][1]);
      }
    }
    setShopArray({
      listData: data,
      display: true,
    });
  };

  const handleClickDetail = (e) => {
    console.log(e.target.id);
    for (let j = 0; j < 10; j++) {
      if (e.target.id === shopArray.listData[j].id) {
        console.log("ヒット");
        setShopDetail({
          detailData: shopArray.listData[j],
          display: true,
        });
        setShopArray({
          display: false,
        });
      }
    }
  };

  const createList = () => {
    if (shopArray.display) {
      const listItems = shopArray.listData.map((d) => (
        <li key={d.id}>
          <img src={d.logo_image} alt="logo" />
          <p>店舗名：{d.name}</p>
          <p>アクセス：{d.access}</p>
          <p>ジャンル:{d.genre.name}</p>
          <button id={d.id} onClick={(e) => handleClickDetail(e)}>
            詳細
          </button>
        </li>
      ));
      return listItems;
    }
  };
  const handleBackDetail = () => {
    setShopArray({
      display: true,
    });
    transList();
    console.log(shopArray);
    setShopDetail({
      display: false,
    });
  };

  const createPagingBtn = () => {
    if (shopArray.display) {
      let btn = <div></div>;
      if (displayList.length > 20) {
        btn = (
          <div>
            <button onClick={() => transList(1)}>1</button>
            <button onClick={() => transList(2)}>2</button>
            <button onClick={() => transList(3)}>3</button>
          </div>
        );
      }
      if (20 > displayList.length && displayList.length > 10) {
        btn = (
          <div>
            <button onClick={() => transList(1)}>1</button>
            <button onClick={() => transList(2)}>2</button>
          </div>
        );
      }
      if (10 >= displayList.length) {
        btn = (
          <div>
            <button onClick={() => transList(1)}>1</button>
          </div>
        );
      }
      return btn;
    }
  };
  return (
    <div>
      <div>
        <p className="">結果はこちら</p>
        {createPagingBtn()}
        <ul>{createList()}</ul>
      </div>
      <div>
        <ShopDetail
          state={shopDetail}
          handleBackDetail={() => handleBackDetail()}
        />
      </div>
    </div>
  );
};

export default ShopList;
