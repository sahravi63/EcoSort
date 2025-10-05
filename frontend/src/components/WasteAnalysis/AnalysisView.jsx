import React from "react";
import {
  Recycle,
  Zap,
  Leaf,
  Volume2,
  VolumeX,
  Share2,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import "./WasteAnalysis.css";

const AnalysisView = ({
  results,
  isAnalyzing,
  selectedFiles,
  selectedMode,
  currentIndex,
  isVoiceEnabled,
  setIsVoiceEnabled,
  onShare,
  onAnalyzeAgain,
  user,
  error,
}) => {
  if (isAnalyzing) {
    return (
      <div className="wa-analyzing">
        <div className="wa-spinner"></div>
        <h2>
          Analyzing your {selectedMode} (
          {Math.min(currentIndex + 1, selectedFiles.length)} of{" "}
          {selectedFiles.length})...
        </h2>
        <p>Our AI is processing your input</p>
        {selectedFiles.length > 0 &&
          currentIndex < selectedFiles.length &&
          (selectedMode === "image" ? (
            <img
              src={selectedFiles[currentIndex]}
              alt="Analyzing"
              className="wa-preview"
            />
          ) : (
            <video
              src={selectedFiles[currentIndex]}
              controls
              className="wa-preview"
            />
          ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="wa-error">
        <AlertCircle size={48} color="#ef4444" />
        <h2>Analysis Error</h2>
        <p>{error}</p>
        <button onClick={onAnalyzeAgain} className="wa-btn wa-btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  if (!results || results.length === 0) return null;

  return (
    <div className="wa-analysis-container">
      <div className="wa-header">
        <h2>Analysis Results ({results.length})</h2>
        <p>
          {user?.username
            ? `Welcome back, ${user.username}! Your points: ${user.points}`
            : "Sign up to save progress and join the leaderboard!"}
        </p>
      </div>

      <div className="wa-results-grid">
        {results.map((result, index) => (
          <div key={`result-${index}`} className="wa-analysis-card">
            <div className="wa-media-card">
              {selectedMode === "image" ? (
                <img
                  src={selectedFiles[index]}
                  alt={`Analyzed ${index + 1}`}
                  className="wa-preview"
                  onError={(e) => (e.target.src = "/placeholder-image.png")}
                />
              ) : (
                <video src={selectedFiles[index]} controls className="wa-preview" />
              )}

              {result.bboxes?.map((box, idx) => (
                <div
                  key={idx}
                  className="wa-bbox"
                  style={{
                    position: "absolute",
                    border: "2px solid red",
                    left: box.bbox[0],
                    top: box.bbox[1],
                    width: box.bbox[2] - box.bbox[0],
                    height: box.bbox[3] - box.bbox[1],
                  }}
                  title={`${box.label} (${Math.round(box.confidence * 100)}%)`}
                >
                  <span className="wa-bbox-label">
                    {box.label} ({Math.round(box.confidence * 100)}%)
                  </span>
                </div>
              ))}
            </div>

            <div className={`wa-result-card ${result.color || "default"}`}>
              <div className="wa-result-header">
                <h3>{result.item || "Unknown Item"}</h3>
                <button
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  className="wa-voice-btn"
                  aria-label="Toggle voice reading"
                >
                  {isVoiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>
              </div>

              <div className="wa-category">
                <span>{result.category || "Uncategorized"}</span>
                {result.confidence && (
                  <span className="wa-confidence">
                    {Math.round(result.confidence)}% confident
                  </span>
                )}
              </div>

              <div className="wa-card">
                <h4>
                  <Recycle size={20} className="icon-green" /> How to Sort
                </h4>
                <p>{result.instructions || "No specific instructions available."}</p>
              </div>

              <div className="wa-card blue">
                <h4>
                  <Zap size={20} className="icon-blue" /> Did You Know?
                </h4>
                <p>{result.facts || "Recycling helps reduce environmental impact."}</p>
              </div>

              <div className="wa-card green">
                <h4>
                  <Leaf size={20} className="icon-green" /> Eco Tip
                </h4>
                <p>{result.ecoTip || "Always clean items before recycling."}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="wa-actions">
        <button className="wa-btn wa-btn-primary" onClick={onShare}>
          <Share2 size={18} /> <span>Share Results</span>
        </button>
        <button className="wa-btn wa-btn-outline" onClick={onAnalyzeAgain}>
          <RotateCcw size={18} /> <span>Analyze Another</span>
        </button>
      </div>
    </div>
  );
};

export default AnalysisView;
