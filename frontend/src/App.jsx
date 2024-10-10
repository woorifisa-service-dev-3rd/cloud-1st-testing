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
        const response = await fetch("http://your-backend-url/api/schedule", {
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
    companyName,
    deadline,
    announcementDate,
    resultStatus,
  }) => {
    try {
      const response = await fetch("http://your-backend-url/api/schedule/add", {
        method: "POST",
        body: JSON.stringify({
          companyName,
          deadline,
          announcementDate,
          resultStatus,
        }),
      });
      setResults([...results, response]);
    } catch (error) {
      console.err("데이터 가져오는 중 오류 발생");
    }
  };

  const updateResult = async (updatedResult) => {
    const { id, companyName, deadline, announcementDate, resultStatus } = updatedResult;
    try {
      const response = await fetch(
        `http://your-backend-url/api/schedule/update/${id}`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName,
            deadline,
            announcementDate,
            resultStatus,
          }),
    
        }
      );

      const updatedResult = await response.json();

      setResults(
        results.map((result) =>
          result.id === updatedResult.id ? updatedResult : result
        )
      );
      setEditResult(null); // 수정 후 편집 상태 초기화
    } catch (error) {
      console.error('업데이트중 오류발생')
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
        <EditSchedule result={editResult} updateResult={updateResult} />
      )}
      <ScheduleList results={results} startEdit={startEdit} />
    </div>
  );
};

export default App;
