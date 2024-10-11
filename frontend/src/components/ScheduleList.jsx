// ResultTable.js
import React from 'react';

const ScheduleList = ({ results, startEdit }) => { 
  return (
    <table>
      <thead>
        <tr>
          <th>회사명</th>
          <th>서류지원 마감</th>
          <th>결과 발표</th>
          <th>결과</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {results.map(result => (
          <tr key={result.id}>
            <td>{result.company_name}</td>
            <td>{result.deadline}</td>
            <td>{result.result_date}</td>
            <td>{result.result}</td>
            <td>
              <button onClick={() => startEdit(result)}>편집</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleList;
