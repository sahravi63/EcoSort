import React, { useEffect } from "react";
import { Award, TrendingUp, Leaf, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserStats, resetState } from "../../store/leaderboardSlice";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { stats, points, itemsAnalyzed, loading } = useSelector(
    (state) => state.leaderboard
  );

  // Get user info from localStorage
  const savedUser = localStorage.getItem("user");
  const parsedUser = savedUser ? JSON.parse(savedUser) : null;
  const userId = parsedUser?.id;
  const token = parsedUser?.token;

  // Fetch leaderboard stats for this user
  useEffect(() => {
    if (userId && token) {
      dispatch(fetchUserStats({ userId, token }));
    }
  }, [dispatch, userId, token]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(resetState());
    navigate("/dashboard");
  };

  // Merge user info + stats safely
  const user = {
    username: parsedUser?.username || parsedUser?.name || "Guest User",
    email: parsedUser?.email || "",
    level: stats?.level || "Eco-Explorer",
    score: stats?.score ?? points ?? 0,
    streak: stats?.streak ?? 0,
    itemsAnalyzed: stats?.itemsAnalyzed ?? itemsAnalyzed ?? 0,
    co2Saved: stats?.co2Saved ?? 0,
    itemsDiverted: stats?.itemsDiverted ?? 0,
    treesPlanted: stats?.treesPlanted ?? 0,
    perfectWeekStreak: stats?.perfectWeekStreak ?? false,
    weeklyActivity: Array.isArray(stats?.weeklyActivity)
      ? stats.weeklyActivity
      : [0, 0, 0, 0, 0, 0, 0],
  };

  const achievements = [
    {
      title: "First Analysis",
      desc: "Analyzed your first item",
      icon: "🎯",
      earned: user.itemsAnalyzed >= 1,
    },
    {
      title: "Week Warrior",
      desc: "7-day sorting streak",
      icon: "🔥",
      earned: user.streak >= 7,
    },
    { title: "Eco Expert", desc: "Reached 1000 points", icon: "⭐", earned: user.score >= 1000 },
    { title: "Master Sorter", desc: "Analyzed 100 items", icon: "🏆", earned: user.itemsAnalyzed >= 100 },
    { title: "Green Guardian", desc: "Saved 100kg CO₂", icon: "🌱", earned: user.co2Saved >= 100 },
    { title: "Recycling Hero", desc: "Perfect week streak", icon: "♻️", earned: user.perfectWeekStreak },
  ];

  const weeklyActivity = user.weeklyActivity;
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxActivity = Math.max(...weeklyActivity, 1);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>{user.username}'s Profile</h2>
        <p>
          {user.username === "Guest User"
            ? "Start your eco-journey! Login to save progress."
            : "Track your eco-journey and achievements"}
        </p>
      </div>

      <div className="profile-grid">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="avatar">
            {user.username
              ? user.username.split(" ").map((n) => n[0]).join("")
              : "EU"}
          </div>
          <h3>{user.username}</h3>
          <p className="user-level">{user.level}</p>

          <div className="profile-stats">
            <div>
              <span>Total Points</span>
              <strong>{user.score}</strong>
            </div>
            <div>
              <span>Current Streak</span>
              <strong>{user.streak} days</strong>
            </div>
            <div>
              <span>Items Analyzed</span>
              <strong>{user.itemsAnalyzed}</strong>
            </div>
          </div>

          {user.username !== "Guest User" ? (
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <button
              className="wa-btn wa-btn-primary"
              onClick={() => navigate("/signup")}
            >
              Login
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="profile-details">
          {/* Achievements */}
          <div className="achievements">
            <h3><Award size={20} /> Achievements</h3>
            <div className="achievements-grid">
              {achievements.map((a, i) => (
                <div key={i} className={`achievement ${a.earned ? "earned" : "locked"}`}>
                  <div className="icon">{a.icon}</div>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="weekly-activity">
            <h3><TrendingUp size={20} /> Weekly Activity</h3>
            <div className="activity-bars">
              {weeklyActivity.map((h, i) => (
                <div key={i} className="bar">
                  <div style={{ height: `${(h / maxActivity) * 100}%` }}></div>
                  <span>{weekDays[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="impact">
            <h3><Leaf size={20} /> Your Environmental Impact</h3>
            <div className="impact-grid">
              <div>
                <div className="impact-value green">{user.co2Saved} kg</div>
                <p>CO₂ Saved</p>
                <small>This month</small>
              </div>
              <div>
                <div className="impact-value blue">{user.itemsDiverted}</div>
                <p>Items Diverted</p>
                <small>From landfills</small>
              </div>
            </div>
            <div className="impact-note">
              🌍 Your actions this month equal planting <strong>{user.treesPlanted} trees</strong>!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
