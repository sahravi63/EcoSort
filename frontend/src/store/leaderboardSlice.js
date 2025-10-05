import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper to normalize backend fields
const normalizeStats = (data) => ({
  ...data,
  itemsAnalyzed: data.itemsAnalyzed ?? data.items_analyzed ?? 0,
  streak: data.streak ?? 0,
  score: data.score ?? 0,
  co2Saved: data.co2Saved ?? 0,
  itemsDiverted: data.itemsDiverted ?? 0,
  treesPlanted: data.treesPlanted ?? 0,
  perfectWeekStreak: data.perfectWeekStreak ?? false,
  weeklyActivity: data.weeklyActivity ?? [0, 0, 0, 0, 0, 0, 0],
});

// ✅ Fetch leaderboard
export const fetchLeaderboard = createAsyncThunk(
  "leaderboard/fetchLeaderboard",
  async () => {
    const res = await axios.get("http://localhost:8000/api/v1/leaderboard");
    return res.data.entries.map((entry) => ({
      username: entry.username,
      score: entry.score,
      itemsAnalyzed: entry.items_analyzed,
      rank: entry.rank,
      streak: entry.streak || 0,
    }));
  }
);

// ✅ Fetch user stats
export const fetchUserStats = createAsyncThunk(
  "leaderboard/fetchUserStats",
  async ({ userId, token }) => {
    const res = await axios.get(
      `http://localhost:8000/api/v1/user/${userId}/stats`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return normalizeStats(res.data);
  }
);

// ✅ Update user stats

export const updateUserStats = createAsyncThunk(
  "leaderboard/updateUserStats",
  async ({ userId, token, score, itemsAnalyzed }, { rejectWithValue }) => {
    try {
      console.log("📤 Sending leaderboard update:", {
        user_id: userId,
        score,
        items_analyzed: itemsAnalyzed,
      });

      const res = await axios.put(
        "http://localhost:8000/api/v1/leaderboard",
        {
          user_id: userId,
          score,
          items_analyzed: itemsAnalyzed,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Leaderboard update response:", res.data);
      return normalizeStats(res.data);
    } catch (error) {
      console.error("❌ Leaderboard update failed:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    leaderboard: [],
    stats: null,
    points: 0,
    itemsAnalyzed: 0,
    analyses: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUserScore(state, action) {
  const { username, score, itemsAnalyzed } = action.payload;
  const itemsCount = itemsAnalyzed ?? state.itemsAnalyzed;

  state.leaderboard = state.leaderboard.map((row) =>
    row.username === username
      ? { ...row, score, itemsAnalyzed: itemsCount }
      : row
  );

  state.points = score;
  state.itemsAnalyzed = itemsCount;
},
    addPoints(state, action) {
      state.points += action.payload;
    },
    addAnalysis(state, action) {
      state.analyses.push(action.payload);
      state.itemsAnalyzed += 1;
    },
    resetState(state) {
      state.points = 0;
      state.itemsAnalyzed = 0;
      state.analyses = [];
      state.stats = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        const stats = normalizeStats(action.payload);
        state.stats = stats;
        state.points = stats.score;
        state.itemsAnalyzed = stats.itemsAnalyzed;
      })
      .addCase(updateUserStats.fulfilled, (state, action) => {
        const stats = normalizeStats(action.payload);
        state.stats = stats;
        state.points = stats.score;
        state.itemsAnalyzed = stats.itemsAnalyzed;

        // ✅ Update leaderboard entry if user is on it
        state.leaderboard = state.leaderboard.map((row) =>
          row.username === stats.username
            ? { ...row, score: stats.score, itemsAnalyzed: stats.itemsAnalyzed }
            : row
        );
      })
      .addCase(updateUserStats.rejected, (state, action) => {
        state.error = action.payload || "Failed to update stats";
      });
  },
});

export const { setUserScore, addPoints, addAnalysis, resetState } =
  leaderboardSlice.actions;
export default leaderboardSlice.reducer;