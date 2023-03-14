import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const latestData=[];
const data = async () => {
    try {
        const savedData = await AsyncStorage.getItem("appData");
        if (savedData) {
            const Data = JSON.parse(savedData);
            //return 
            latestData=Data;
            return Data;
        }
        return [];
    } catch {
        console.log(error)
    }
}

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    value:[],
  },
  reducers: {
    updateGallery: (state,payload) => {
      state.value=payload;
    },
    setInitialState:(state,payload)=>{
        state.value= payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateGallery,setInitialState } = gallerySlice.actions



export default gallerySlice.reducer