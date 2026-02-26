# 🐦 SocialX - Real-Time Social Media Platform

![Project Status](https://img.shields.io/badge/Status-Capstone--Project-blue?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-22-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203-brightgreen?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/Frontend-ReactJS-61DAFB?style=for-the-badge&logo=react)

**SocialX** is a feature-rich, full-stack social media platform inspired by Instagram. Developed as a university capstone project, it focuses on seamless user interaction, real-time communication, and scalable architecture.

---

## 🚀 Tech Stack

| Component | Technologies |
| :--- | :--- |
| **Backend** | Spring Boot, Apache Kafka, WebSocket, MySQL, JDK 22, GMail API |
| **Frontend** | ReactJS, Redux, TailwindCSS, Material UI, Mapbox API, Cloudinary |
| **Security** | JWT Authentication |
| **DevOps** | Docker, Docker Compose, Vite |

---

## ✅ Key Features

### 👤 User Management
* **Authentication:** Secure Register, Login, Forgot Password, and Change Password flows.
* **Profiles:** Customizable user profiles and public profile viewing.
* **Social Graph:** Follow and Unfollow system to build connections.
* **Admin Control:** Dedicated features for administrators to Lock/Unlock user accounts.

### 📝 Content & Interaction
* **Posts:** Create, view, and like media-rich posts.
* **Engagement:** Commenting system and "Repost/Undo Repost" functionality.
* **Location:** Integration with Mapbox API for location-based features.

### 💬 Real-Time Features
* **Messaging:** Instant 1-on-1 chatting powered by **WebSocket**.
* **Instant Notifications:** Real-time alerts for likes and interactions using **Apache Kafka** and **WebSocket**.
* **Analytics:** Visual statistics and user engagement metrics.

---

## 📂 Project Structure

This repository uses **Git Submodules** to manage the frontend and backend independently:

```bash
SocialX/
├── frontend/   # ReactJS client (Submodule)
└── backend/    # Spring Boot API (Submodule)
