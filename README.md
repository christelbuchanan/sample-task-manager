# Company Task Organizer

A modern task management application designed for organizing tasks by company, similar to Pipedrive. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Company Management**: Create, view, and manage company profiles
- **Task Organization**: Organize tasks by company and status
- **Kanban Board**: Visualize tasks in a kanban-style board with drag-and-drop functionality
- **Priority Levels**: Assign low, medium, or high priority to tasks
- **Responsive Design**: Beautiful UI that works across devices

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Unique IDs**: UUID

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/company-task-organizer.git
cd company-task-organizer
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
company-task-organizer/
├── public/
├── src/
│   ├── components/
│   │   ├── modals/
│   │   │   ├── AddCompanyModal.tsx
│   │   │   ├── AddTaskModal.tsx
│   │   │   └── EditTaskModal.tsx
│   │   ├── CompanyDetails.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TaskBoard.tsx
│   │   └── TaskCard.tsx
│   ├── context/
│   │   └── AppContext.tsx
│   ├── data/
│   │   └── initialData.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .eslintrc.js
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Usage

### Managing Companies

1. Click the "+" button in the sidebar to add a new company
2. Fill in the company details in the modal form
3. Select a company from the sidebar to view its tasks

### Managing Tasks

1. Click "Add Task" to create a new task for the selected company
2. Drag and drop tasks between status columns (Todo, In Progress, Review, Completed)
3. Edit or delete tasks using the options menu on each task card

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## Future Enhancements

- User authentication and authorization
- Team collaboration features
- File attachments for tasks
- Email notifications
- Calendar integration
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Pipedrive and other CRM systems
- Built with modern React best practices
