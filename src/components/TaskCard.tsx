import React from 'react';
import { Task, Company } from '../types';
import { useAppContext } from '../context/AppContext';
import { 
  Calendar, 
  Clock, 
  Edit, 
  Trash2, 
  AlertCircle, 
  CheckCircle2
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  company: Company;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, company, onEdit }) => {
  const { deleteTask, changeTaskStatus } = useAppContext();

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-orange-600 bg-orange-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== 'completed';
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 cursor-move"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800">{task.title}</h3>
        <div className="flex space-x-1">
          <button 
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            title="Edit task"
            onClick={() => onEdit(task)}
          >
            <Edit size={14} className="text-gray-500" />
          </button>
          <button 
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            title="Delete task"
            onClick={() => deleteTask(task.id)}
          >
            <Trash2 size={14} className="text-gray-500" />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center mb-3">
        {company.logo ? (
          <img 
            src={company.logo} 
            alt={company.name} 
            className="w-5 h-5 rounded-full mr-2 object-cover"
          />
        ) : (
          <div className="w-5 h-5 rounded-full bg-gray-200 mr-2"></div>
        )}
        <span className="text-xs text-gray-500">{company.name}</span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        
        {isOverdue() && (
          <span className="text-xs px-2 py-1 rounded-full text-red-600 bg-red-50 flex items-center">
            <AlertCircle size={12} className="mr-1" />
            Overdue
          </span>
        )}
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center">
          <Calendar size={12} className="mr-1" />
          <span>{formatDate(task.dueDate)}</span>
        </div>
        
        {task.status === 'completed' ? (
          <span className="flex items-center text-green-600">
            <CheckCircle2 size={12} className="mr-1" />
            Completed
          </span>
        ) : (
          <div className="flex items-center">
            <Clock size={12} className="mr-1" />
            <span>{task.status.replace('-', ' ')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
