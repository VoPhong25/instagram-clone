**🐦 Real-Time Social Media Platform**

Project is a full-stack social media platform inspired by Instagram, developed as a university capstone project. It supports user interaction, real-time messaging, notifications, post engagement, and administrative features.


**🚀 Tech Stack**

Backend: Spring Boot · Apache Kafka · WebSocket · MySQL · JDK 22 · Docker· GMail API
Frontend: ReactJS · Redux · TailwindCSS · Material UI · Map box API· Cloudinary
Other Tools: Docker Compose · JWT Authentication · Vite
**✅ Features**
**👤 User System**
Register / Login / Forgot Password / Change Password
Edit profile, view other users’ profiles
Follow / Unfollow users
Lock / Unlock user accounts (Admin)
**📝 Post System**
Create, view, and like posts
Comment on posts
Repost / Undo repost
**💬 Real-Time Features**
Direct messaging using WebSocket
Instant notifications (Kafka + WebSocket)
View analytics and user statistics
**📂 Project Structure**
This repository includes both the frontend and backend as submodules:

 ├── frontend/ # ReactJS client └── backend/ # Spring Boot API 

Make sure to run git submodule update --init --recursive after cloning this repo to pull in the submodules.

**⚙️ Getting Started**
**1️⃣ Clone with Submodules**
git clone https://github.com/binhdtqxk/SocialX.git
cd SocialX
git submodule update --init --recursive
