# 🌍 EcoSort AI: Intelligent Waste Analyzer & Educator

EcoSort AI is an **AI-powered waste management and education system** designed to detect, classify, and educate users about proper waste disposal through **AI-driven analysis, interactive chatbot support, gamification, and educational feedback**.

---

## 🚀 Features

- ♻️ **Waste Detection & Classification** – Identifies and classifies waste (plastic, paper, metal, organic, etc.) from **images and videos** using deep learning.
- 🧠 **Personalized Education** – Provides **eco-friendly disposal tips** via **text and audio**.
- 💬 **Interactive Chatbot** – Real-time **AI chatbot** answers recycling and sustainability-related questions.
- 🏆 **Gamification Engine** – Earn **points, badges, and leaderboard positions** for correct actions and eco-friendly participation.
- 🔁 **User Feedback Loop** – Users can mark model predictions as correct/incorrect to **improve dataset quality** and model performance.
- 🗣️ **Voice & Multimodal Support** – Integrated **Text-to-Speech (TTS)** and optional **Speech-to-Text (STT)** for accessibility.
- 📊 **Analytics & Admin Dashboard** – Track system usage, accuracy rates, and top waste categories.
- ☁️ **Deployment-Ready** – Optimized for **cloud or Docker** environments.
- 🔮 **Future Roadmap** – Integration with **AR-enabled smart bins**, **IoT sensors**, and **eco-reward systems**.

---

## 🧩 Tech Stack

| Layer | Technologies |
|--------|---------------|
| **Backend** | FastAPI, Python, MySQL |
| **Frontend** | React.js |
| **AI/ML** | PyTorch, OpenCV, Transformers, Scikit-learn |
| **Audio/Video Processing** | MoviePy, gTTS, SpeechRecognition |
| **Database** | MySQL (or MariaDB) |
| **Deployment** | Docker (optional), Cloud-ready |

---



1️⃣ Install Dependencies


### 1️⃣ Clone the Repository
```bash
git clone https://github.com/sahravi63/EcoSort.git
cd EcoSort-AI

- pip install -r requirements.txt

2️⃣ Configure Database
- export DATABASE_URL="mysql+mysqlconnector://username:password@localhost/ecosortdb"

# Windows PowerShell:
# setx DATABASE_URL "mysql+mysqlconnector://username:password@localhost/ecosortdb"

3️⃣ Run Backend
- cd Backend
- uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

## Frontend Setup
- cd frontend
- npm install
- npm start

