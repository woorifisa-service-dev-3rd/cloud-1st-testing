// EditForm.js
import React, { useEffect, useState } from "react";

const EditSchedule = ({ result, updateResult }) => {
  const [company_name, setCompanyName] = useState(result.company_name);
  const [deadline, setDeadline] = useState(result.deadline);
  const [result_date, setResultDate] = useState(
    result.result_date
  );
  const [scheduleResult, setScheduleResult] = useState(result.result); 

  useEffect(() => {
    setCompanyName(result.company_name);
    setScheduleResult(result.result);
    setDeadline(result.deadline);
    setResultDate(result.result_date)
  },[result])

    // 결과 값을 숫자로 변환하는 함수
    const convertResultToNumber = (result) => {
      console.log('result', result);
      
      switch (result) {
        case '진행중':
          return 1;
        case '합격':
          return 2;
        case '불합격':
          return 3;
        default:
          return null;
      }
    };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedResult = {
      ...result,
      company_name,
      deadline,
      result_date,
      result: convertResultToNumber(scheduleResult), 
    };
    updateResult(updatedResult);
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>스케줄 수정</h2>
      <div className="form_wrap">
        <div>
          <label htmlFor="company_name">회사명</label>
          <input
            id="company_name"
            type="text"
            value={company_name}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="deadline">서류지원 마감</label>
          <input
            id="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="result_date">결과 발표</label>
          <input
            id="result_date"
            type="datetime-local"
            value={result_date}
            onChange={(e) => setResultDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="result">결과</label>
          <select
            id="result"
            value={scheduleResult}
            onChange={(e) => setScheduleResult(e.target.value)}
          >
            <option value="합격">합격</option>
            <option value="불합격">불합격</option>
            <option value="진행중">진행중</option>
          </select>
        </div>
        <div className="button_wrap">
          <button type="submit">수정</button>
        </div>
      </div>
    </form>
  );
};

export default EditSchedule;
