import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Company, Task } from '../types';
import { initialState } from '../data/initialData';
import { v4 as uuidv4 } from 'uuid';

type Action =
  | { type: 'SELECT_COMPANY'; payload: string | null }
  | { type: 'ADD_COMPANY'; payload: Omit<Company, 'id'> }
  | { type: 'UPDATE_COMPANY'; payload: Company }
  | { type: 'DELETE_COMPANY'; payload: string }
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id' | 'createdAt'> }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'CHANGE_TASK_STATUS'; payload: { taskId: string; status: Task['status'] } };

type AppContextType = {
  state: AppState;
  selectCompany: (companyId: string | null) => void;
  addCompany: (company: Omit<Company, 'id'>) => void;
  updateCompany: (company: Company) => void;
  deleteCompany: (companyId: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  changeTaskStatus: (taskId: string, status: Task['status']) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SELECT_COMPANY':
      return {
        ...state,
        selectedCompany: action.payload
      };
    case 'ADD_COMPANY':
      return {
        ...state,
        companies: [...state.companies, { ...action.payload, id: uuidv4() }]
      };
    case 'UPDATE_COMPANY':
      return {
        ...state,
        companies: state.companies.map(company => 
          company.id === action.payload.id ? action.payload : company
        )
      };
    case 'DELETE_COMPANY':
      return {
        ...state,
        companies: state.companies.filter(company => company.id !== action.payload),
        tasks: state.tasks.filter(task => task.companyId !== action.payload),
        selectedCompany: state.selectedCompany === action.payload ? null : state.selectedCompany
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
            id: uuidv4(),
            createdAt: new Date().toISOString().split('T')[0]
          }
        ]
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'CHANGE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.taskId 
            ? { ...task, status: action.payload.status } 
            : task
        )
      };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const selectCompany = (companyId: string | null) => {
    dispatch({ type: 'SELECT_COMPANY', payload: companyId });
  };

  const addCompany = (company: Omit<Company, 'id'>) => {
    dispatch({ type: 'ADD_COMPANY', payload: company });
  };

  const updateCompany = (company: Company) => {
    dispatch({ type: 'UPDATE_COMPANY', payload: company });
  };

  const deleteCompany = (companyId: string) => {
    dispatch({ type: 'DELETE_COMPANY', payload: companyId });
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const updateTask = (task: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task });
  };

  const deleteTask = (taskId: string) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const changeTaskStatus = (taskId: string, status: Task['status']) => {
    dispatch({ type: 'CHANGE_TASK_STATUS', payload: { taskId, status } });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        selectCompany,
        addCompany,
        updateCompany,
        deleteCompany,
        addTask,
        updateTask,
        deleteTask,
        changeTaskStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
