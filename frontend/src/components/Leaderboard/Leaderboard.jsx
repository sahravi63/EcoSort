import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trophy } from "lucide-react";
import {
  fetchLeaderboard,
  fetchUserStats,
  setUserScore,
} from "../../store/leaderboardSlice";
import "./Leaderboard.css";

const Leaderboard = ({ user }) => {
  const dispatch = useDispatch();
  const { leaderboard, stats, loading, error } = useSelector(
    (state) => state.leaderboard
  );

  // Fetch leaderboard + user stats
  useEffect(() => {
    dispatch(fetchLeaderboard());
    if (user?.token && user?.id) {
      dispatch(fetchUserStats({ userId: user.id, token: user.token }));
    }
  }, [user?.token, user?.id, dispatch]);

  // Sync local user score with leaderboard
  useEffect(() => {
    if (user?.username && user?.points !== undefined) {
      dispatch(
        setUserScore({
          username: user.username,
          score: user.points,
          itemsAnalyzed: user.itemsAnalyzed || 0,
        })
      );
    }
  }, [user?.points, user?.itemsAnalyzed, user?.username, dispatch]);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>Community Leaderboard</h2>
        <p>See how you rank among eco-warriors worldwide!</p>
      </div>

      {/* User Rank Card */}
      {stats && (
        <div className="user-rank-card">
          <div className="rank-card-content">
            <div>
              <h3>Your Rank</h3>
              <p className="subtitle">Keep up the great work!</p>
            </div>
            <div className="rank-number">
              <div className="big-rank">#{stats.rank}</div>
              <div className="subtitle">This Week</div>
            </div>
          </div>
          <div className="user-stats">
            <p>Total Points: {stats.score}</p>
            <p>🔥 Streak: {stats.streak || 0} days</p>
            <p>Analyzed: {stats.itemsAnalyzed}/50 this week</p>
          </div>
        </div>
      )}

      {/* Top Users */}
      <div className="leaderboard-list">
        <div className="list-header">
          <h3>Top Eco-Warriors</h3>
        </div>
        <div className="players">
          {leaderboard.map((player) => (
            <div
              key={player.username}
              className={`player-row ${
                user && player.username === user.username ? "highlight" : ""
              }`}
            >
              <div className="player-info">
                <div
                  className={`rank-circle ${
                    player.rank <= 3 ? "top-rank" : "normal-rank"
                  }`}
                >
                  {player.rank}
                </div>
                <div className="badge">
                  {player.rank === 1
                    ? "🏆"
                    : player.rank === 2
                    ? "🥈"
                    : player.rank === 3
                    ? "🥉"
                    : "⭐"}
                </div>
                <div>
                  <p className="player-name">{player.username}</p>
                  <p className="player-level">{player.score} pts</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Challenge */}
      {stats && (
        <div className="weekly-challenge">
          <div className="challenge-header">
            <Trophy className="trophy-icon" size={24} />
            <h3>Weekly Challenge</h3>
          </div>
          <p className="challenge-desc">
            Sort 50 items correctly to earn bonus points!
          </p>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${(stats.itemsAnalyzed / 50) * 100}%`,
                }}
              ></div>
            </div>
            <span className="progress-text">
              {stats.itemsAnalyzed}/50
            </span>
          </div>
        </div>
      )}

      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Leaderboard;
