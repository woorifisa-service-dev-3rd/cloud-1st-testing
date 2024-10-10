// EditForm.js
import React, { useState } from "react";

const EditSchedule = ({ result, updateResult }) => {
  const [companyName, setCompanyName] = useState(result.companyName);
  const [deadline, setDeadline] = useState(result.deadline);
  const [announcementDate, setAnnouncementDate] = useState(
    result.announcementDate
  );
  const [resultStatus, setResultStatus] = useState(result.resultStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedResult = {
      ...result,
      companyName,
      deadline,
      announcementDate,
      resultStatus,
    };
    updateResult(updatedResult);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>스케줄 수정</h2>
      <div className="form_wrap">
        <div>
          <label htmlFor="companyName">회사명</label>
          <input
            id="companyName"
            type="text"
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
        <div className="button_wrap">
          <button type="submit">수정</button>
        </div>
      </div>
    </form>
  );
};

export default EditSchedule;
