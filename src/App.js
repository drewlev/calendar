import './App.css';
import React from 'react';
import { useState } from 'react';
import date from "datejs"
import Calendar from './calendar';

function App() {
  const [monthView, setMonthView] = useState();

  return (
    <div className="App">
      <Calendar/>
    </div>
  );
}

export default App;
