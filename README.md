# Task Management Dashboard

## Overview
A simple React-based task management app that lets you add, update, and organize tasks across different statuses using drag-and-drop. It integrates with a backend API for persistent data storage.

## Features
- Add tasks with title, description, and status (To Do, In Progress, Done).
- Drag and drop tasks between columns to update their status.
- Delete tasks by dragging them to a delete area.
- Responsive and modern UI built with Tailwind CSS.
- Backend integration with REST API endpoints for adding, updating, fetching, and deleting tasks.

## Tech Stack
- React.js
- Tailwind CSS
- React Router
- Fetch API
- Node.js / Express (backend, your own implementation)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Siva-kalidindi/React-Task-Manager.git
2. **Install Dependencies**
   ```bash
   cd React-Task-Manager
   npm install
3. **Run The React App**
   ```bash
   npm start
4.Make sure your backend server is running separately (e.g., on http://localhost:5001) for full functionality.

**Usage**
- Add new tasks with a title and description.

- Drag tasks between "To Do", "In Progress", and "Done" columns to update their status.

- Drag tasks to the delete area at the top to remove them.

**Future Improvements**
- User authentication and multiple user support.

- Real-time updates with WebSocket or Socket.IO.

- Task deadlines, priority levels, and notifications.

- Enhanced UI animations and accessibility.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

