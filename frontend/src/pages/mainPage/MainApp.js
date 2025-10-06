import React, { useState, useRef } from "react";
import {
  Camera, User, Home, BookOpen, MessageCircle, Trophy, Star, Leaf,
} from "lucide-react";
import Dashboard from "../../components/Dashboard/Dashboard";
import WasteAnalysis from "../../components/WasteAnalysis/WasteAnalysis";
import Chatbot from "../../components/Chatbot/Chatbot";
import Education from "../../components/Education/Education";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import Profile from "../../components/Profile/Profile";
import "./MainApp.css";

const MainApp = ({ user, setUser }) => {
  const [currentView, setCurrentView] = useState("home");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "bot",
      message:
        "Hi! I'm your EcoSort AI assistant. Ask me anything about waste sorting and recycling!",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const wasteResults = [
    {
      item: "Plastic Water Bottle",
      category: "Recyclable",
      confidence: 95,
      instructions:
        "Remove cap and label. Rinse thoroughly. Place in recycling bin.",
      facts: "It takes 450 years for a plastic bottle to decompose!",
      ecoTip: "Use a reusable water bottle to reduce plastic waste.",
      color: "green",
    },
    {
      item: "Banana Peel",
      category: "Compostable",
      confidence: 98,
      instructions:
        "Add to your compost bin or food waste collection.",
      facts: "Banana peels are rich in potassium and make excellent fertilizer!",
      ecoTip: "Can be used to polish leather shoes naturally.",
      color: "yellow",
    },
    {
      item: "Pizza Box",
      category: "Mixed Waste",
      confidence: 87,
      instructions:
        "Remove greasy parts and dispose as general waste. Clean parts can be recycled.",
      facts: "Greasy cardboard contaminates recycling streams.",
      ecoTip: "Order pizza with eco-friendly packaging.",
      color: "orange",
    },
  ];

  const analyzeWaste = async (imageFile) => {
    setIsAnalyzing(true);
    setSelectedImage(URL.createObjectURL(imageFile));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const randomResult =
      wasteResults[Math.floor(Math.random() * wasteResults.length)];
    setAnalysisResult(randomResult);
    setIsAnalyzing(false);

    if (user) {
      setUser((prev) => ({
        ...prev,
        points: prev.points + 10,
        itemsAnalyzed: prev.itemsAnalyzed + 1,
      }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      analyzeWaste(file);
      setCurrentView("analysis");
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [...prev, { role: "user", message: chatInput }]);
    setChatInput("");

    setTimeout(() => {
      const responses = [
        "Great question! Here's what I recommend...",
        "That's a common waste sorting challenge. Let me help...",
        "Excellent eco-conscious thinking! Here's the best approach...",
        "I can definitely help with that sustainability question...",
      ];
      const botResponse =
        responses[Math.floor(Math.random() * responses.length)];
      setChatMessages((prev) => [...prev, { role: "bot", message: botResponse }]);
    }, 1000);
  };

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return <Dashboard user={user} onNavigate={setCurrentView} />;
      case "camera":
      case "analysis":
        return (
          <WasteAnalysis
            result={analysisResult}
            isAnalyzing={isAnalyzing}
            selectedImage={selectedImage}
            isVoiceEnabled={isVoiceEnabled}
            setIsVoiceEnabled={setIsVoiceEnabled}
            onImageUpload={handleImageUpload}
            fileInputRef={fileInputRef}
            showAnalysis={currentView === "analysis"}
          />
        );
      case "education":
        return <Education />;
      case "chat":
        return (
          <Chatbot
            messages={chatMessages}
            onSubmit={handleChatSubmit}
            chatInput={chatInput}
            setChatInput={setChatInput}
          />
        );
      case "leaderboard":
        return <Leaderboard user={user} />;
      case "profile":
        return <Profile user={user} />;
      default:
        return <Dashboard user={user} onNavigate={setCurrentView} />;
    }
  };

  return (
  <div className="app-container">
    {/* Dummy Header */}
    <div className="dummy-header">
      🌍 Welcome to EcoSort AI — Making Waste Sorting Smarter!
    </div>

    {/* Header */}
    <header className="app-header">
      <div className="app-header-inner">
        <div className="app-logo">
          <div className="logo-icon">
            <Leaf className="text-white" size={24} />
          </div>
          <div>
            <h1 className="logo-title">EcoSort AI</h1>
            <p className="logo-subtitle">Intelligent Waste Analyzer</p>
          </div>
        </div>

        <div className="app-header-user">
          {user && (
            <>
              <div className="points">
                <Star className="text-yellow-500" size={16} />
                <span>{user.points}</span>
              </div>
              <div className="user-avatar">
                <User className="text-white" size={16} />
              </div>
            </>
          )}
        </div>
      </div>
    </header>

    <div className="flex">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-buttons">
          {[
            { id: "home", label: "Dashboard", icon: Home },
            { id: "camera", label: "Analyze Waste", icon: Camera },
            { id: "education", label: "Learn & Tips", icon: BookOpen },
            { id: "chat", label: "AI Assistant", icon: MessageCircle },
            { id: "leaderboard", label: "Leaderboard", icon: Trophy },
            { id: "profile", label: "Profile", icon: User },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`sidebar-button ${
                  currentView === item.id ? "active" : ""
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">{renderContent()}</main>
    </div>
  </div>
);

};

export default MainApp;
