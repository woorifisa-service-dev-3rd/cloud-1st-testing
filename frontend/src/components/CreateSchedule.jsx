import React, { useState } from 'react';

const CreateSchedule = ({ addResult }) => {
  const [company_name, setCompanyName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [result_date, setResultDate] = useState('');
  const [result, setResult] = useState(3); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const newResult = {
      company_name,
      deadline,
      result_date,
      result,
    };
    addResult(newResult);
    clearForm();
  };

  const clearForm = () => {
    setCompanyName('');
    setDeadline('');
    setResultDate('');
    setResult(3); 
  };

  const handleResultChange = (e) => {
    const value = e.target.value; 
    if (value === "합격") {
      setResult(1);
    } else if (value === "불합격") {
      setResult(2);
    } else {
      setResult(3); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>스케줄 추가</h2>
      <div className='form_wrap'>
        <div>
          <label htmlFor="company_name">회사명</label>
          <input
            id="company_name"
            type="text"
            placeholder="회사명"
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
            value={result === 1 ? "합격" : result === 2 ? "불합격" : "진행 중"} 
            onChange={handleResultChange} 
          >
            <option value="진행 중">진행 중</option>
            <option value="합격">합격</option>
            <option value="불합격">불합격</option>
          </select>
        </div>
        <div className='button_wrap'>
          <button type="submit">추가</button>
        </div>
      </div>
    </form>
  );
};

export default CreateSchedule;
