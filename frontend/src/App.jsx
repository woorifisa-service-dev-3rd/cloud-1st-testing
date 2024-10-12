// App.js
import React, { useEffect, useState } from "react";
import CreateSchedule from "./components/CreateSchedule";
import EditSchedule from "./components/EditSchedule";
import ScheduleList from "./components/ScheduleList";
import Count from "./components/Count";

const App = () => {
  const [results, setResults] = useState([]);
  const [editResult, setEditResult] = useState(null);

  //스케줄 조회
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

  //스케줄 add
  const addResult = async ({ company_name, deadline, result_date, result }) => {
    try {
      const response = await fetch("http://localhost:8080/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name,
          deadline: deadline,
          result_date: result_date,
          result,
        }),
      });

      const newResult = await response.json();
      setResults([...results, newResult]);
    } catch (error) {
      console.error("데이터 추가 중 오류 발생:", error);
    }
  };

  //스케줄 update
  const updateResultHandler = async (updatedResult) => {
    console.log(updatedResult);
    
    try {
      const reponse = await fetch(
        `http://localhost:8080/api/schedule/${updatedResult.id}`,
        {
          method: "POST",
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
      const newUpdatedResult = await reponse.json();
      const updatedResults = results.map((result) => 
        result.id === newUpdatedResult.id ? newUpdatedResult : result
      )
      setResults(updatedResults);
      setEditResult(null);
      
    } catch (error) {
      console.error("업데이트 중 오류 발생",error);
      
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
      <Count/>
    </div>
  );
};

export default App;
