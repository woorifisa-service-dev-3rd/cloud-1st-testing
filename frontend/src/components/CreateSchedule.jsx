// CreateForm.js
import React, { useState } from 'react';

const CreateSchedule = ({ addResult }) => {
  const [company_name, setCompanyName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [result_date, setResultDate] = useState('');
  const [result, setResult] = useState('진행중'); 

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
    setResult('진행중'); 
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
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="result_date">결과 발표</label>
        <input
          id="result_date"
          type="date"
          value={result_date}
          onChange={(e) => setResultDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="result">결과</label>
        <select
          id="result"
          value={result}
          onChange={(e) => setResult(e.target.value)}
        >
          <option value="합격">합격</option>
          <option value="불합격">불합격</option>
          <option value="진행중">진행중</option>
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
