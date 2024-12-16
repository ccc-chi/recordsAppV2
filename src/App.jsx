import { useEffect, useState } from 'react'
import './App.css'

export const App = () => {
  const [records, setRecords] = useState([])
  const [inputTitle, setInputTitle] = useState('')
  const onChangeTitle = (event) => setInputTitle(event.target.value);
  const [inputTime, setInputTime] = useState(0)
  const onChangeTime = (event) => setInputTime(event.target.value);
  const [error, setError] = useState();
  const onClickAddRecord = () => {
    const inputRecords = { title: inputTitle, time: Number(inputTime) }
    if (!inputTitle && inputTime === 0) {
      setError('入力がありません')
    }
    else if (!inputTitle) {
      setError('学習内容を入れてください')
    }
    else if (inputTime === 0) {
      setError('学習時間を入れてください')
    } else {
      setError('')
      const newRecords = [...records, inputRecords]
      setRecords(newRecords)
      setInputTitle('')
      setInputTime(0)
    }
  }

  const [totalTime, setTotalTime] = useState(0)
  useEffect(() => {
    if (records.length > 0) {
      const time = records.map(user => user.time)
      const total = time.reduce((a, b) => { return a + b, 0 })
      setTotalTime(total)
    }
  }, [records])


  return (
    <>
      <h1>学習記録一覧</h1>
      <div className="">
        <div>
          <span>学習内容</span>
          <input type="text" value={inputTitle} onChange={onChangeTitle} />
        </div>
        <div>
          <span>学習時間</span>
          <input type="number" min={0} value={inputTime} onChange={onChangeTime} /><span>時間</span>
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
        <ul>
          {
            records.map((record, index) => {
              return (
                <li key={index}>
                  <p>{record.title}　{record.time}時間</p>
                </li>
              )
            })
          }
        </ul>
        <button onClick={onClickAddRecord}>登録</button>
        {error && <p>{error}</p>}
        <p>合計時間：{totalTime}/1000h</p>
      </div>
    </>
  )
}

