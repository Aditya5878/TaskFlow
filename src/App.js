
import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard.js';
import './App.css';

import jsonData from './components/data.json';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    // Fetch data from JSON file
    setTickets(jsonData.tickets || []); 
    setUsers(jsonData.users || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
  }, [groupBy]);

  const handleGroupChange = (e) => {
    setGroupBy(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="App">
      <div className="controls">
        <div className="group-by">
          <label>Group By:</label>
          <select value={groupBy} onChange={handleGroupChange}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="sort-by">
          <label>Sort By:</label>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;
