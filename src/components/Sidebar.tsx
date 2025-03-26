import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Building2, Plus, Search } from 'lucide-react';
import AddCompanyModal from './modals/AddCompanyModal';

const Sidebar: React.FC = () => {
  const { state, selectCompany } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);

  const filteredCompanies = state.companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Companies</h2>
          <button 
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            title="Add Company"
            onClick={() => setIsAddCompanyModalOpen(true)}
          >
            <Plus size={20} className="text-gray-600" />
          </button>
        </div>
        
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search companies..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="space-y-1">
          <button
            className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
              state.selectedCompany === null ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200'
            }`}
            onClick={() => selectCompany(null)}
          >
            <Building2 size={18} className="mr-2" />
            <span>All Companies</span>
          </button>
          
          {filteredCompanies.map(company => (
            <button
              key={company.id}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                state.selectedCompany === company.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200'
              }`}
              onClick={() => selectCompany(company.id)}
            >
              {company.logo ? (
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="w-6 h-6 rounded-full mr-2 object-cover"
                />
              ) : (
                <Building2 size={18} className="mr-2" />
              )}
              <span className="truncate">{company.name}</span>
            </button>
          ))}
        </div>
      </div>

      <AddCompanyModal 
        isOpen={isAddCompanyModalOpen} 
        onClose={() => setIsAddCompanyModalOpen(false)} 
      />
    </div>
  );
};

export default Sidebar;
