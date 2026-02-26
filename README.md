🐦 SocialX - Real-Time Social Media Platform
SocialX is a feature-rich, full-stack social media platform inspired by Instagram. Developed as a university capstone project, it focuses on seamless user interaction, real-time communication, and scalable architecture.

🚀 Tech Stack
Component	Technologies
Backend	Spring Boot, Apache Kafka, WebSocket, MySQL, JDK 22, GMail API
Frontend	ReactJS, Redux, TailwindCSS, Material UI, Mapbox API, Cloudinary
Security	JWT Authentication
DevOps	Docker, Docker Compose, Vite
✅ Key Features
👤 User Management
Authentication: Secure Register, Login, Forgot Password, and Change Password flows.

Profiles: Customizable user profiles and public profile viewing.

Social Graph: Follow and Unfollow system to build connections.

Admin Control: Dedicated features for administrators to Lock/Unlock user accounts.

📝 Content & Interaction
Posts: Create, view, and like media-rich posts.

Engagement: Commenting system and "Repost/Undo Repost" functionality.

Location: Integration with Mapbox API for location-based features.

💬 Real-Time Features
Direct Messaging: Instant 1-on-1 chatting powered by WebSocket.

Instant Notifications: Real-time alerts for likes and interactions using Apache Kafka and WebSocket.

Analytics: Visual statistics and user engagement metrics.

📂 Project Structure
This repository uses Git Submodules to manage the frontend and backend independently:

Bash
SocialX/
├── frontend/   # ReactJS client (Submodule)
└── backend/    # Spring Boot API (Submodule)
[!WARNING]

Since this project uses submodules, a standard git clone will not download the source code for the frontend and backend folders automatically.

⚙️ Getting Started
1️⃣ Clone the Repository
Clone the main project and initialize all submodules in one command:

Bash
git clone --recursive https://github.com/binhdtqxk/SocialX.git
cd SocialX
If you have already cloned the repo without submodules, run:

Bash
git submodule update --init --recursive
2️⃣ Environment Configuration
Backend: Navigate to backend/src/main/resources/ and update application.yml with your MySQL credentials, Gmail API keys, and Kafka broker address.

Frontend: Create a .env file in the frontend/ directory for Cloudinary and Mapbox API keys.

3️⃣ Run with Docker
Start the required infrastructure (MySQL, Kafka, Zookeeper) easily:

Bash
docker-compose up -d
🛠 Development Commands
Run Backend: ./mvnw spring-boot:run (inside /backend)

Run Frontend: npm run dev (inside /frontend)
