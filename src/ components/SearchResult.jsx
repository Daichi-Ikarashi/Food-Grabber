const SeachResult = (props) => {
  console.log("受け取りました");

  const shopData = props.shopData;
  console.log(shopData);

  const testDataArray = [];
  for (let i = 0; i < shopData.results_returned; i++) {
    testDataArray.push(shopData.shop[i]);
  }
  console.log(testDataArray);
  const listItems = testDataArray.map((d) => (
    <li>
      <button>{d.id}</button>
      店舗名：{d.name}
      アクセス：{d.access}
      ロゴ：
      <img src={d.logo_image} alt="logo" />
    </li>
  ));
  console.log(listItems);

  return (
    <div className="result-container">
      <h2>検索結果を表示するコンポーネント</h2>
      <p>propsを受け取って、とりあえず表示</p>
      <ul>{listItems}</ul>
    </div>
  );
};

export default SeachResult;
