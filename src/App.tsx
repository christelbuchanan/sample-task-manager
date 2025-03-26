import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskBoard from './components/TaskBoard';
import CompanyDetails from './components/CompanyDetails';

function App() {
  return (
    <AppProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <TaskBoard />
          <CompanyDetails />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
