import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth-slice'
import postSlice from './features/post-slice'
import searchResultSlice from './features/search-result-slice'
import themeSlice from './features/theme-slice'

const store = configureStore({
    reducer: {
        theme: themeSlice,
        auth: authSlice,
        post: postSlice,
        search_result: searchResultSlice
    }
})

export default store