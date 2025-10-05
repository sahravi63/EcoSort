import React from "react";
import { Camera, Upload, Video } from "lucide-react";
import "./WasteAnalysis.css";

const CameraView = ({
  selectedMode, setSelectedMode,
  imageInputRef, videoInputRef,
  onImageUpload, onVideoUpload,
  onTakePhoto,
  isProcessing
}) => (
  <div className="wa-container">
    <div className="wa-header">
      <h2>Analyze Your Waste</h2>
      <p>Upload a photo or video to get instant sorting guidance</p>
    </div>
    <div className="wa-mode-select">
      <button
        className={`wa-mode-btn ${selectedMode === "image" ? "active" : ""}`}
        onClick={() => setSelectedMode("image")}
        disabled={isProcessing}
      >
        <Camera size={20} /> Image
      </button>
      <button
        className={`wa-mode-btn ${selectedMode === "video" ? "active" : ""}`}
        onClick={() => setSelectedMode("video")}
        disabled={isProcessing}
      >
        <Video size={20} /> Video
      </button>
    </div>
    <div className="wa-upload-card">
      <div className="wa-camera-icon">
        {selectedMode === "image" ? (
          <Camera className="text-white" size={40} />
        ) : (
          <Video className="text-white" size={40} />
        )}
      </div>
      <h3>Ready to Analyze</h3>
      <p>Our AI will identify the material or action and provide guidance</p>
      <div className="wa-btn-group">
        {selectedMode === "image" ? (
          <>
            <button
              onClick={() => imageInputRef.current?.click()}
              className="wa-btn wa-btn-primary"
              disabled={isProcessing}
            >
              <Upload size={20} /> Upload Photos
            </button>
            <button 
              onClick={onTakePhoto} 
              className="wa-btn wa-btn-outline"
              disabled={isProcessing}
            >
              <Camera size={20} /> Take Photo
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={onImageUpload}
              className="hidden"
              disabled={isProcessing}
            />
          </>
        ) : (
          <>
            <button
              onClick={() => videoInputRef.current?.click()}
              className="wa-btn wa-btn-primary"
              disabled={isProcessing}
            >
              <Upload size={20} /> Upload Video
            </button>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={onVideoUpload}
              className="hidden"
              disabled={isProcessing}
            />
          </>
        )}
      </div>
    </div>
    <div className="wa-tips">
      <h4>
        {selectedMode === "image"
          ? "📸 Photo Tips for Best Results"
          : "🎬 Video Tips for Best Results"}
      </h4>
      <ul>
        <li>Ensure good lighting and clear focus</li>
        {selectedMode === "image" ? (
          <>
            <li>Center the item in the frame</li>
            <li>Avoid cluttered backgrounds</li>
            <li>Take photos from multiple angles if needed</li>
          </>
        ) : (
          <>
            <li>Keep the video short (10–30s)</li>
            <li>Show a clear object/action of interest</li>
            <li>Hold camera steady for clarity</li>
          </>
        )}
      </ul>
    </div>
  </div>
);

export default CameraView;