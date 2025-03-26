import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Building2, Plus, Settings, User } from 'lucide-react';
import AddTaskModal from './modals/AddTaskModal';

const Header: React.FC = () => {
  const { state } = useAppContext();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  
  const selectedCompany = state.selectedCompany 
    ? state.companies.find(c => c.id === state.selectedCompany) 
    : null;

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center mr-10">
          <Building2 size={28} className="text-blue-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">TaskFlow</h1>
        </div>
        
        {selectedCompany && (
          <div className="flex items-center">
            <span className="text-gray-400 mx-2">/</span>
            <div className="flex items-center">
              {selectedCompany.logo ? (
                <img 
                  src={selectedCompany.logo} 
                  alt={selectedCompany.name} 
                  className="w-6 h-6 rounded-full mr-2 object-cover"
                />
              ) : (
                <Building2 size={18} className="mr-2 text-gray-600" />
              )}
              <span className="font-medium text-gray-700">{selectedCompany.name}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => setIsAddTaskModalOpen(true)}
        >
          <Plus size={16} className="mr-1" />
          <span>New Task</span>
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Settings size={20} className="text-gray-600" />
        </button>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={16} className="text-gray-600" />
          </div>
        </div>
      </div>

      <AddTaskModal 
        isOpen={isAddTaskModalOpen} 
        onClose={() => setIsAddTaskModalOpen(false)}
        companyId={state.selectedCompany || undefined}
      />
    </header>
  );
};

export default Header;
