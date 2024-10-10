// App.js
import React, { useEffect, useState } from "react";
import CreateSchedule from "./components/CreateSchedule";
import EditSchedule from "./components/EditSchedule";
import ScheduleList from "./components/ScheduleList";

const App = () => {
  const [results, setResults] = useState([]);
  const [editResult, setEditResult] = useState(null);

  useEffect(() => {
    const getSchedule = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/schedule", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("네트워크 응답이 좋지 않습니다.");
        }
        const data = await response.json();
        setResults(data);
      } catch {
        console.error("데이터 가져오는 중 오류 발생");
      }
    };
    getSchedule();
  }, []);

  const addResult = async ({
    company_name,
    deadline,
    result_date,
    result,
  }) => {
    try {
      const response = await fetch("http://localhost:8080/api/schedule", {
        method: "POST",
        body: JSON.stringify({
          company_name,
          deadline,
          result_date,
          result,
        }),
      });
      setResults([...results, response]);
    } catch (error) {
      console.error("데이터 가져오는 중 오류 발생");
    }
  };

// Result 수정 기능, 파라미터로 업데이트할 Result 객체를 받음
const updateResultHandler = async (updatedResult) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/schedule/${updatedResult.id}`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name: updatedResult.company_name,
          deadline: updatedResult.deadline,
          result_date: updatedResult.result_date,
          result: updatedResult.result,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("네트워크 응답이 좋지 않습니다.");
    }

    const newUpdatedResult = await response.json();

    // 기존 결과 목록에서 수정된 결과로 업데이트
    const updatedResults = results.map((result) =>
      result.id === newUpdatedResult.id ? newUpdatedResult : result
    );

    setEditResult(updatedResults); // 수정 후 편집 상태 초기화
  } catch (error) {
    console.error('업데이트중 오류발생', error);
  }
};

  const startEdit = (result) => {
    setEditResult(result);
  };

  return (
    <div>
      <h1>서류 리스트</h1>
      {!editResult ? (
        <CreateSchedule addResult={addResult} />
      ) : (
        <EditSchedule result={editResult} updateResult={updateResultHandler} />
      )}
      <ScheduleList results={results} startEdit={startEdit} />
    </div>
  );
};

export default App;
