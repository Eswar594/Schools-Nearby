# 📚 Schools-Nearby Project

The **Schools-Nearby** project is a web app that helps users find nearby schools based on their geographical location (latitude and longitude). Built with **React** for the frontend, **Node.js** and **Express.js** for the backend, and **MySQL** for the database.

---

## 🧑‍💻 Technologies Used

- **Frontend**: 
  - 🖥️ **React.js** 
  - 🎨 **Chakra UI**
  - 📦 **Axios** (For API calls)

- **Backend**:
  - 🌐 **Node.js** (Runtime)
  - ⚡ **Express.js** (Web Framework)
  - 🔒 **CORS** (Cross-Origin Resource Sharing)

- **Database**:
  - 🗄️ **MySQL** (Relational Database)

---

## 🌟 Features

### 1. Frontend (React.js)
- 🏫 Add new schools using a form (school name, address, latitude, longitude).
- 📍 Get nearby schools based on user-provided coordinates.

### 2. Backend (Node.js + Express.js)
- 💻 Exposes two routes:
  - `POST /addSchool`: Add a new school.
  - `GET /listSchools`: Get nearby schools by latitude and longitude.

### 3. Database (MySQL)
- 🗃️ Stores school data including:
  - Name
  - Address
  - Latitude
  - Longitude
