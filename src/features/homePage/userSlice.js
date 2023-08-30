import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "https://jsonplaceholder.typicode.com/todo/1";

const initialState = {
  name: "smelly",
  email: "",
  error: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  songs: [],
  isLoggedIn: false,
};

export const fetchSongs = createAsyncThunk("songs", async () => {
    const response = await axios.get(SERVER_URL);
    console.log(response)
    return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
      state.isLoggedIn = true;
    },
    logOutUser: (state) => {
      state.name = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSongs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedSongs = action.payload((song) => {
          console.log("Fetching Songs");
        });
        // added all fetched songs to the array
        state.songs = state.songs.concat(loadedSongs);
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user.status;

export const { setUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
