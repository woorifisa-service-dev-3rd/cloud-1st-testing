// App.js
import React, { useState } from 'react';
import CreateSchedule from './components/CreateSchedule';
import EditSchedule from './components/EditSchedule';
import ScheduleList from './components/ScheduleList';



const App = () => {
  const [results, setResults] = useState([]);
  const [editResult, setEditResult] = useState(null);

  const addResult = (newResult) => {
    setResults([...results, newResult]);
  };

  const updateResult = (updatedResult) => {
    setResults(results.map(result => (result.id === updatedResult.id ? updatedResult : result)));
    setEditResult(null); // 수정 후 편집 상태 초기화
  };

  const startEdit = (result) => {
    setEditResult(result);
  };

  return (
    <div>
      <h1>서류</h1>
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
