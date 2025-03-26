export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  contactPerson: string;
  email: string;
  phone: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  companyId: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
}

export interface AppState {
  companies: Company[];
  tasks: Task[];
  selectedCompany: string | null;
}
