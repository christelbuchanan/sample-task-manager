import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TaskCard from './TaskCard';
import { Plus, MoveHorizontal } from 'lucide-react';
import AddTaskModal from './modals/AddTaskModal';
import EditTaskModal from './modals/EditTaskModal';
import { Task } from '../types';

const TaskBoard: React.FC = () => {
  const { state, changeTaskStatus } = useAppContext();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  
  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'completed', title: 'Completed' }
  ];

  const filteredTasks = state.selectedCompany
    ? state.tasks.filter(task => task.companyId === state.selectedCompany)
    : state.tasks;

  const handleAddTask = (columnId: string) => {
    setSelectedColumn(columnId);
    setIsAddTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsEditTaskModalOpen(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    const taskId = e.dataTransfer.getData('taskId');
    changeTaskStatus(taskId, columnId as Task['status']);
  };

  return (
    <div className="flex-1 overflow-x-auto p-6">
      <div className="flex space-x-4 min-w-max">
        {columns.map(column => {
          const columnTasks = filteredTasks.filter(task => task.status === column.id);
          
          return (
            <div 
              key={column.id}
              className="w-72 flex flex-col bg-gray-50 rounded-lg p-2"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex items-center justify-between mb-2 px-2">
                <h3 className="font-medium text-gray-700">{column.title}</h3>
                <span className="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-0.5">
                  {columnTasks.length}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto max-h-[calc(100vh-180px)]">
                {columnTasks.map(task => {
                  const company = state.companies.find(c => c.id === task.companyId)!;
                  return (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      company={company} 
                      onEdit={handleEditTask}
                    />
                  );
                })}
                
                {columnTasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-32 text-gray-400 text-sm">
                    <MoveHorizontal size={24} className="mb-2" />
                    <p>No tasks yet</p>
                  </div>
                )}
              </div>
              
              <button 
                className="mt-2 w-full py-2 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors"
                onClick={() => handleAddTask(column.id)}
              >
                <Plus size={16} className="mr-1" />
                Add Task
              </button>
            </div>
          );
        })}
      </div>

      <AddTaskModal 
        isOpen={isAddTaskModalOpen} 
        onClose={() => setIsAddTaskModalOpen(false)}
        companyId={state.selectedCompany || undefined}
      />

      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        onClose={() => setIsEditTaskModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskBoard;
