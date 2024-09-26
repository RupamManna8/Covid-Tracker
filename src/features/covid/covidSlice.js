import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCovidDataWorld = createAsyncThunk("covid/fetchData", async () => {
  const response = await axios.get("https://covid-19.dataflowkit.com/v1/world");
  return response.data;
});

export const fetchCovidDataByCountry = createAsyncThunk(
  "covid/fetchByCountry",
  async (country, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://covid-19.dataflowkit.com/v1/${country}`
      );
      return response.data;
    } catch(error){
      return rejectWithValue(error.response.data);
    }
  }
);

const covidSlice = createSlice({
  name: "covid",
  initialState: {
    worldData: {},
    countryData: {},
    statusWorld: 'idle', 
    statusCountry: 'idle',
    errorWorld: null,
    errorCountry: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchCovidDataWorld.pending, (state) => {
        state.statusWorld = 'loading';
      })
      .addCase(fetchCovidDataWorld.fulfilled, (state, action) => {
        state.statusWorld = 'succeeded';
        state.worldData = action.payload;
      })
      .addCase(fetchCovidDataWorld.rejected, (state, action) => {
        state.statusWorld = 'failed';
        state.errorWorld = action.payload || 'Failed to fetch world data';
      })
      
      .addCase(fetchCovidDataByCountry.pending, (state) => {
        state.statusCountry = 'loading';
      })
      .addCase(fetchCovidDataByCountry.fulfilled, (state, action) => {
        state.statusCountry = 'succeeded';
        state.countryData = action.payload;
      })
      .addCase(fetchCovidDataByCountry.rejected, (state, action) => {
        state.statusCountry = 'failed';
        state.errorCountry = action.payload || 'Failed to fetch country data';
      });
  },
});

export default covidSlice.reducer;
