# **Task Manager**

## **Short Description**

A responsive task management application where users can **add, edit, delete, and reorder tasks** using a **drag-and-drop** interface. Tasks are categorized into **To-Do, In Progress, and Done** and are **instantly synced** to a database for persistence. The app includes **Firebase authentication**, a modern UI, and **real-time updates** with MongoDB and Express.js.

## **Live Links**

- [Task Manager Live Site](https://task-management-app-fcaff.web.app/)
- [Task Manager Alternative Live Site](https://task-manager112.netlify.app/)

## **Dependencies**

### **Frontend Dependencies**

```json
{
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^10.0.0",
  "@tanstack/react-query": "^5.66.7",
  "axios": "^1.7.9",
  "firebase": "^11.3.1",
  "react": "^19.0.0",
  "react-dnd": "^16.0.1",
  "react-dnd-html5-backend": "^16.0.1",
  "react-dom": "^19.0.0",
  "react-hot-toast": "^2.5.2",
  "react-icons": "^5.5.0",
  "react-modal": "^3.16.3",
  "react-movable": "^3.4.0",
  "react-router-dom": "^6.29.0",
  "react-spinners": "^0.15.0",
  "react-tooltip": "^5.28.0",
  "socket.io-client": "^4.8.1",
  "sweetalert2": "^11.6.13"
}
```

## **Installation Steps**

### **1. Clone the Repository**

```bash
git clone https://github.com/Sadia492/Task-Manager
cd task-management-app
```

### **2. Setup the Frontend**

```bash
cd frontend
npm install
npm run dev
```

### **3. Setup the Backend**

```bash
cd backend
npm install
npm start
```

### **4. Environment Variables**

Create a `.env` file in the **backend** folder and add:

```
DB_User=your_mongodb_user
DB_Pass=your_secret_key
```

In the **frontend**, create a `.env` file for Firebase settings:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
```

## **Technologies Used**

- **Frontend:** React, Vite.js,Tailwind Css, Firebase Authentication
- **Backend:** Express.js, MongoDB
- **Libraries:** Axios, DaisyUi, DND-Kit
