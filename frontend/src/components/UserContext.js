import React, { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserStats } from "../store/leaderboardSlice"; // ✅ import Redux action

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    id: null,
    username: null,
    points: 0,
    token: null,
    itemsAnalyzed: 0,
    streak: 0,
    level: "Eco-Explorer",
    co2Saved: 0,
    treesPlanted: 0,
    perfectWeekStreak: false,
    weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
  });

  // ✅ Update stats after analysis (local + backend)
  const addAnalysisStats = ({ points = 0, co2 = 0, trees = 0 }) => {
    setUser((prev) => {
      const today = new Date().getDay();
      const newWeeklyActivity = [...prev.weeklyActivity];
      newWeeklyActivity[today === 0 ? 6 : today - 1] += 1;

      const newPoints = (prev.points || 0) + points;
      let newLevel = prev.level;
      if (newPoints >= 1000) newLevel = "Eco Expert";
      else if (newPoints >= 500) newLevel = "Eco Warrior";
      else if (newPoints >= 100) newLevel = "Eco Explorer";

      const updatedUser = {
        ...prev,
        points: newPoints,
        itemsAnalyzed: (prev.itemsAnalyzed || 0) + 1,
        streak: (prev.streak || 0) + 1,
        co2Saved: (prev.co2Saved || 0) + co2,
        treesPlanted: (prev.treesPlanted || 0) + trees,
        weeklyActivity: newWeeklyActivity,
        level: newLevel,
        perfectWeekStreak: newWeeklyActivity.every((v) => v > 0),
      };

      // ✅ Immediately update backend leaderboard
      if (prev.id && prev.token) {
        dispatch(
          updateUserStats({
            userId: prev.id,
            token: prev.token,
            score: updatedUser.points,
            itemsAnalyzed: updatedUser.itemsAnalyzed,
          })
        );
      }

      return updatedUser;
    });
  };

  // Set username
  const setUsername = (username) => {
    setUser((prev) => ({ ...prev, username }));
  };

  // Reset user on logout
  const logout = () => {
    setUser({
      id: null,
      username: null,
      points: 0,
      token: null,
      itemsAnalyzed: 0,
      streak: 0,
      level: "Eco-Explorer",
      co2Saved: 0,
      treesPlanted: 0,
      perfectWeekStreak: false,
      weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
    });
    localStorage.removeItem("user");
  };

  // Persist user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUsername, addAnalysisStats, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
