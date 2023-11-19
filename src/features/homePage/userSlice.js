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
  playlist: null,
  songs: [],
  isLoggedIn: false,
};

export const fetchSongs = createAsyncThunk("songs", async () => {
  const response = await axios.get(SERVER_URL);
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
// playlist related actions
export const postForPlaylist = createAsyncThunk(
  "create Playlist",
  async (data) => {
    const response = await axios.post(`${SERVER_URL}playlist/create`, data);
    return response.data;
  },
);

export const addToPlaylist = createAsyncThunk("addSong", async (data) => {
  const reponse = await axios.post(`${SERVER_URL}addSong/create`, data);
  return reponse.data;
});

export const removeFromPlaylist = createAsyncThunk(
  "removeSong",
  async (data) => {
    const reponse = await axios.delete(`${SERVER_URL}addSong/${data}`);
    return reponse.data;
  },
);
// like related actions
export const postFavorite = createAsyncThunk("postFavorite", async (data) => {
  const reponse = await axios.post(`${SERVER_URL}like`, data);
  return reponse.data;
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
      })

      .addCase(postForPlaylist.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postForPlaylist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playlist = action.payload;
      })
      .addCase(postForPlaylist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToPlaylist.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addToPlaylist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playlist = action.payload;
      })
      .addCase(addToPlaylist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(removeFromPlaylist.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeFromPlaylist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playlist = action.payload;
      })
      .addCase(removeFromPlaylist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user.status;

export const { setUser, logOutUser, setSelectedSong, setStatus } =
  userSlice.actions;

export default userSlice.reducer;
