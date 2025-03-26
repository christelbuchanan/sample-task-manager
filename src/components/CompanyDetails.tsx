import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Building2, Mail, Phone, Briefcase, X } from 'lucide-react';

const CompanyDetails: React.FC = () => {
  const { state, selectCompany } = useAppContext();
  
  if (!state.selectedCompany) return null;
  
  const company = state.companies.find(c => c.id === state.selectedCompany);
  if (!company) return null;
  
  const companyTasks = state.tasks.filter(task => task.companyId === company.id);
  
  const taskStats = {
    total: companyTasks.length,
    completed: companyTasks.filter(t => t.status === 'completed').length,
    inProgress: companyTasks.filter(t => t.status === 'in-progress').length,
    todo: companyTasks.filter(t => t.status === 'todo').length,
    review: companyTasks.filter(t => t.status === 'review').length
  };
  
  return (
    <div className="w-72 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">Company Details</h2>
        <button 
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => selectCompany(null)}
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        {company.logo ? (
          <img 
            src={company.logo} 
            alt={company.name} 
            className="w-20 h-20 rounded-full object-cover mb-3"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
            <Building2 size={32} className="text-gray-500" />
          </div>
        )}
        <h3 className="text-xl font-medium text-gray-800">{company.name}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Briefcase size={14} className="mr-1" />
          <span>{company.industry}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h4>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
              <Mail size={14} className="text-blue-600" />
            </div>
            <span className="text-gray-600">{company.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
              <Phone size={14} className="text-blue-600" />
            </div>
            <span className="text-gray-600">{company.phone}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Task Statistics</h4>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Total Tasks</span>
            <span className="text-sm font-medium">{taskStats.total}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full mb-4">
            {taskStats.total > 0 && (
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${(taskStats.completed / taskStats.total) * 100}%` }}
              ></div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2 rounded border border-gray-200">
              <div className="text-xs text-gray-500">To Do</div>
              <div className="text-lg font-medium">{taskStats.todo}</div>
            </div>
            <div className="bg-white p-2 rounded border border-gray-200">
              <div className="text-xs text-gray-500">In Progress</div>
              <div className="text-lg font-medium">{taskStats.inProgress}</div>
            </div>
            <div className="bg-white p-2 rounded border border-gray-200">
              <div className="text-xs text-gray-500">Review</div>
              <div className="text-lg font-medium">{taskStats.review}</div>
            </div>
            <div className="bg-white p-2 rounded border border-gray-200">
              <div className="text-xs text-gray-500">Completed</div>
              <div className="text-lg font-medium">{taskStats.completed}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
