const SeachResult = (props) => {
  console.log("受け取りました");
  console.log(props.range);
  return (
    <div className="result-container">
      <h2>検索結果を表示するコンポーネント</h2>
      <p>propsを受け取って、とりあえず表示</p>
    </div>
  );
};

export default SeachResult;
