// App.js
import React, { useEffect, useState } from "react";
import CreateSchedule from "./components/CreateSchedule";
import EditSchedule from "./components/EditSchedule";
import ScheduleList from "./components/ScheduleList";

const App = () => {
  const [results, setResults] = useState([]);
  const [editResult, setEditResult] = useState(null);
// 서류 update
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

  //서류추가
  const addResult = async ({
    company_name,
    deadline,
    result_date,
    result,
  }) => {
    console.log(company_name, deadline, result_date, result);
    
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
  
    const formattedDeadline = formatDate(deadline);
    const formattedResultDate = formatDate(result_date);
  
    try {
      const response = await fetch("http://localhost:8080/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name,
          deadline: formattedDeadline,  // 올바른 필드 이름으로 수정
          result_date: formattedResultDate, // 올바른 필드 이름으로 수정
          result,
        }),
      });
  
      const newResult = await response.json(); // 응답 본문을 JSON으로 변환
      console.log(newResult);
      
      setResults([...results, newResult]);
    } catch (error) {
      console.error("데이터 추가 중 오류 발생:", error);
    }
  };
  


const updateResultHandler = async (updatedResult) => {
    // 날짜를 'yyyy-MM-dd HH:mm' 형식으로 변환
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const formattedDeadline = formatDate(updatedResult.deadline);
    const formattedResultDate = formatDate(updatedResult.result_date);
  
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
          deadline: formattedDeadline,
          result_date: formattedResultDate,
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

    setResults(updatedResults); // results 상태를 업데이트하여 UI에 반영
    setEditResult(null); // 수정 후 편집 상태 초기화
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
