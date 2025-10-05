# EcoSort AI:Intelligent Waste Analyzer & Educator
### Features

- Waste Detection & Classification – Detects and classifies waste types from images and videos.

- Personalized Education – Eco-friendly disposal tips via text and audio.

- Interactive Chatbot – Answers recycling queries in real-time.

- Gamification – Points, badges, and leaderboard to encourage eco-friendly actions.

- User Feedback Loop – Correct/incorrect predictions enhance the dataset and AI model.

- Voice & Multimodal Support – Text-to-Speech (TTS) for instructions; optional Speech-to-Text (STT) for chatbot.

- Analytics & Admin Dashboard – Monitor usage stats, common waste types, and AI accuracy.

- Deployment-ready – Designed for cloud or Docker deployment.

- Future Roadmap – AR-enabled smart bins, rewards integration, IoT-connected bins.

## Tech Stack

- Backend: FastAPI, Python, MySQL

- Frontend: React.js

- AI/ML: PyTorch, OpenCV, Transformers, Scikit-learn

- Audio/Video: MoviePy, gTTS, SpeechRecognition

- Database: MySQL (or MariaDB)

- Deployment: Docker (optional), Cloud-ready


1️⃣ Install Dependencies

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

