import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://localhost:3500/song/";

const initialState = {
  name: "smelly",
  email: "",
  error: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed',
  index: 0,
  selectedSong: { src: null, title: null },
  songs: [],
  isLoggedIn: false,
};

export const fetchSongs = createAsyncThunk("songs", async () => {
  const response = await axios.get(SERVER_URL);
  console.log(response);
  return response.data;
});

export const postSong = createAsyncThunk("upload", async (data) => {
  const response = await axios.post(`${SERVER_URL}upload`, data);
  return response.data;
});

export const getFile = createAsyncThunk("download", async (data) => {
  const response = await axios.get(`${SERVER_URL}download/${data}`);
  return response.data;
});

export const postForSong = createAsyncThunk("search", async (data) => {
  const response = await axios.post(`${SERVER_URL}search/`, data);
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
    setSelectedSong: (state, action) => {
      (state.selectedSong.src = SERVER_URL + "play/" + `${action.payload.src}`),
        (state.selectedSong.title = action.payload.title),
        (state.index = action.payload.index);
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchSongs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedSongs = action.payload;
        // added all fetched songs to the array
        state.songs = loadedSongs.success;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postSong.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postSong.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(postSong.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getFile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getFile.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(getFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(postForSong.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postForSong.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedSongs = action.payload;
        state.songs = loadedSongs.songs;
      })
      .addCase(postForSong.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user.status;

export const { setUser, logOutUser, setSelectedSong, setStatus } =
  userSlice.actions;

export default userSlice.reducer;
