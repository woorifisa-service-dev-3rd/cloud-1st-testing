// CreateForm.js
import React, { useState } from 'react';

const CreateSchedule = ({ addResult }) => {
  const [companyName, setCompanyName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [announcementDate, setAnnouncementDate] = useState('');
  const [resultStatus, setResultStatus] = useState('진행중'); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const newResult = {
      id: Date.now(),
      companyName,
      deadline,
      announcementDate,
      resultStatus, 
    };
    addResult(newResult);
    clearForm();
  };

  const clearForm = () => {
    setCompanyName('');
    setDeadline('');
    setAnnouncementDate('');
    setResultStatus('진행중'); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>스케줄 추가</h2>
      <div className='form_wrap'>
      <div>
        <label htmlFor="companyName">회사명</label>
        <input
          id="companyName"
          type="text"
          placeholder="회사명"
          value={companyName}
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
        <label htmlFor="announcementDate">결과 발표</label>
        <input
          id="announcementDate"
          type="date"
          value={announcementDate}
          onChange={(e) => setAnnouncementDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="resultStatus">결과</label>
        <select
          id="resultStatus"
          value={resultStatus}
          onChange={(e) => setResultStatus(e.target.value)}
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
