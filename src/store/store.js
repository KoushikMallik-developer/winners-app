// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import walletReducer from './slices/walletSlice'
import gameReducer from './slices/gameSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        wallet: walletReducer,
        game: gameReducer,
    },
})
