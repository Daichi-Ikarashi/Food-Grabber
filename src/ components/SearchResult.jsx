import { useEffect, useState } from "react";
import ShopList from "./ShopList";

const SeachResult = (props) => {
  const [displayList, setDisplayList] = useState(0);

  useEffect(() => {
    console.log("変換します");
    const shopData = Object.keys(props.resultData.shop).map((key) => {
      return [Number(key), props.resultData.shop[key]];
    });
    setDisplayList(shopData);
  }, [props]);

  const createShopList = () => {
    if (displayList !== 0) {
      return <ShopList displayList={displayList} />;
    }
  };

  return (
    <div>
      <p>検索結果：{props.resultData.results_returned}件見つかりました</p>
      {createShopList()}
    </div>
  );
};

export default SeachResult;
