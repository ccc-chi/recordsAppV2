import { useEffect, useState } from "react";
import "./App.css";
import {
  addRecords,
  deleteRecords,
  getAllRecords,
} from "./utils/supabaseFunctions";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState([]);
  useEffect(() => {
    // 最初のデータを取得
    const getRecords = async () => {
      const records = await getAllRecords();
      setRecords(records);
      setIsLoading(false);
    };
    getRecords();
  }, []);

  // 学習の合計時間
  const [totalTime, setTotalTime] = useState(0);
  useEffect(() => {
    const time = records.map((record) => Number(record.time));
    const total = time.reduce((a, b) => a + b, 0);
    setTotalTime(total);
  }, [records]);

  // データを追加
  const [inputTitle, setInputTitle] = useState("");
  const onChangeTitle = (event) => setInputTitle(event.target.value);
  const [inputTime, setInputTime] = useState(0);
  const onChangeTime = (event) => setInputTime(event.target.value);
  const [error, setError] = useState();
  const onClickAddRecord = async () => {
    if (!inputTitle && inputTime === 0) {
      setError("入力がありません");
    } else if (!inputTitle) {
      setError("学習内容を入れてください");
    } else if (inputTime === 0) {
      setError("学習時間を入れてください");
    } else {
      setError("");
      // supabaseに追加
      await addRecords(inputTitle, inputTime);

      // リストに追加
      const records = await getAllRecords();
      setRecords(records);

      // inputをリセット
      setInputTitle("");
      setInputTime(0);
    }
  };

  // データを削除
  const onClickDeleate = async (id) => {
    await deleteRecords(id);
    const records = await getAllRecords();
    setRecords(records);
  };

  if (isLoading) {
    return <p style={{ margin: "0 20px" }}>Loading...</p>;
  } else {
    return (
      <>
        <h1>学習記録一覧</h1>
        <div className="">
          <div>
            <span>内容</span>
            <input type="text" value={inputTitle} onChange={onChangeTitle} />
          </div>
          <div>
            <span>時間</span>
            <input
              type="number"
              min={0}
              value={inputTime}
              onChange={onChangeTime}
            />
            <span>時間</span>
          </div>
        </div>
        <div className="">
          <div>
            <span>入力されている学習内容：</span>
            <span>{inputTitle}</span>
          </div>
          <div>
            <span>入力されている時間：</span>
            <span>{inputTime}</span>
          </div>
        </div>
        <div className="">
          <ul className="stdylist--wrap">
            {records.map((record) => {
              return (
                <li className="studylist" key={record.id}>
                  <p>
                    {record.title}　{record.time}時間
                  </p>
                  <button onClick={() => onClickDeleate(record.id)}>
                    削除
                  </button>
                </li>
              );
            })}
          </ul>
          <button onClick={onClickAddRecord}>登録</button>
          {error && <p>{error}</p>}
          <p>合計時間：{totalTime}/1000h</p>
        </div>
      </>
    );
  }
};
