// ResultTable.js
import React from 'react';

const ScheduleList = ({ results, startEdit }) => { 

  const getResultStyle = (result) => {
    switch (result) {
      case "합격":
        return { color: "blue" }; // 파란색
      case "불합격":
        return { color: "red" }; // 빨간색
      case "진행중":
        return { color: "black" }; // 연두색
      default:
        return {}; // 기본 스타일
    }
  };

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
        {results.map((result) => (
          <tr key={result.id}>
            <td>{result.company_name}</td>
            <td>
              {result.deadline.slice(0, 10) +
                " " +
                result.deadline.slice(11, 16)}
            </td>
            <td>
              {result.result_date
                ? result.result_date.slice(0, 10) +
                  " " +
                  result.result_date.slice(11, 16)
                : "미정"}
            </td>
            <td style={getResultStyle(result.result)}>{result.result}</td>
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
