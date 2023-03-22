import { createSlice } from '@reduxjs/toolkit'

let initialState = 'light'
const savedTheme = localStorage.getItem('theme')
if (savedTheme) {
    initialState = savedTheme
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        changeTheme: (state, action) => {
            localStorage.setItem('theme', action.payload)
            return action.payload
        }
    }
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer