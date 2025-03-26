import { AppState } from '../types';
import { v4 as uuidv4 } from 'uuid';

const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const initialState: AppState = {
  selectedCompany: null,
  companies: [
    {
      id: '1',
      name: 'Acme Corporation',
      industry: 'Technology',
      contactPerson: 'John Doe',
      email: 'john@acme.com',
      phone: '555-1234',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60'
    },
    {
      id: '2',
      name: 'Globex',
      industry: 'Finance',
      contactPerson: 'Jane Smith',
      email: 'jane@globex.com',
      phone: '555-5678',
      logo: 'https://images.unsplash.com/photo-1611095973763-414019e72400?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXBhbnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60'
    },
    {
      id: '3',
      name: 'Initech',
      industry: 'Consulting',
      contactPerson: 'Michael Johnson',
      email: 'michael@initech.com',
      phone: '555-9012',
      logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWQlMjBjb21wdXRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60'
    }
  ],
  tasks: [
    {
      id: uuidv4(),
      title: 'Finalize contract',
      description: 'Review and sign the final contract',
      companyId: '1',
      status: 'todo',
      priority: 'high',
      dueDate: formatDate(nextWeek),
      createdAt: formatDate(today)
    },
    {
      id: uuidv4(),
      title: 'Schedule kickoff meeting',
      description: 'Set up initial project kickoff with stakeholders',
      companyId: '1',
      status: 'in-progress',
      priority: 'medium',
      dueDate: formatDate(nextWeek),
      createdAt: formatDate(today)
    },
    {
      id: uuidv4(),
      title: 'Prepare quarterly report',
      description: 'Compile financial data for Q2 report',
      companyId: '2',
      status: 'review',
      priority: 'high',
      dueDate: formatDate(nextWeek),
      createdAt: formatDate(today)
    },
    {
      id: uuidv4(),
      title: 'Update client proposal',
      description: 'Revise proposal based on client feedback',
      companyId: '3',
      status: 'todo',
      priority: 'medium',
      dueDate: formatDate(nextWeek),
      createdAt: formatDate(today)
    },
    {
      id: uuidv4(),
      title: 'Send invoice',
      description: 'Process monthly invoice for services',
      companyId: '2',
      status: 'completed',
      priority: 'low',
      dueDate: formatDate(today),
      createdAt: formatDate(today)
    }
  ]
};
