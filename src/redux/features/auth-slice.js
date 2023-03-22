import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import {
	editUserRequest,
	loginRequest,
	logoutRequest,
	renewTokenRequest,
	signupRequest,
} from './service/auth-service'

const initialState = {
	authPending: 'false',
	user: null,
	exp: null,
	tokenRenewed: false,
}

const userInLocal = localStorage.getItem('user')
const expInLocal = localStorage.getItem('exp')
const userInSession = sessionStorage.getItem('user')
const expInSession = sessionStorage.getItem('exp')
const now = new Date().getTime()

if (userInLocal && now < JSON.parse(expInLocal)) {
	initialState.user = JSON.parse(userInLocal)
	initialState.exp = JSON.parse(expInLocal)
} else if (userInSession && now < JSON.parse(expInSession)) {
	initialState.user = JSON.parse(userInSession)
	initialState.exp = JSON.parse(expInSession)
} else {
	localStorage.removeItem('user')
	localStorage.removeItem('exp')
	sessionStorage.clear()
}

export const signup = createAsyncThunk(
	'auth/signup',
	async (payload, thunkAPI) => {
		let success = false
		let data

		await toast.promise(signupRequest(payload), {
			loading: 'Signing up...',
			success: res => {
				data = res
				if (!res.ok) throw new Error(res.errorMsg)
				success = true
				return 'Signed up successfully!'
			},
			error: err => {
				success = false
				return err.toString().split(': ')[1]
			},
		})

		if (success) return data
		return thunkAPI.rejectWithValue(data)
	}
)

export const login = createAsyncThunk(
	'auth/login',
	async (payload, thunkAPI) => {
		const { values } = payload
		let success = false
		let data

		await toast.promise(loginRequest(values), {
			loading: 'Logging you in...',
			success: res => {
				data = res
				if (!res.ok) throw new Error(res.errorMsg)
				success = true
				return 'Logged in successfully!'
			},
			error: err => {
				success = false
				return err.toString().split(': ')[1]
			},
		})

		if (success) return data
		return thunkAPI.rejectWithValue(data)
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	await logoutRequest()
})

export const renewToken = createAsyncThunk(
	'auth/renewToken',
	async (payload, thunkAPI) => {
		const response = await renewTokenRequest(payload)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

export const editUser = createAsyncThunk(
	'user/edit',
	async (payload, thunkAPI) => {
		const { pLoad, userId } = payload
		let success = false
		let data

		await toast.promise(editUserRequest(userId, pLoad), {
			loading: 'Saving...',
			success: res => {
				data = res
				if (!res.ok) throw new Error(res.errorMsg)
				success = true
				return 'Saved successfully!'
			},
			error: err => {
				success = false
				return err.toString().split(': ')[1]
			},
		})

		if (success) return data
		return thunkAPI.rejectWithValue(data)
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// signup request
			.addCase(signup.pending, (state, action) => {
				state.authPending = true
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.authPending = false
				state.user = action.payload.user
				state.exp = action.payload.exp

				sessionStorage.setItem('exp', JSON.stringify(action.payload.exp))
				sessionStorage.setItem('user', JSON.stringify(action.payload.user))
			})
			.addCase(signup.rejected, (state, action) => {
				state.authPending = false
			})

			// login request
			.addCase(login.pending, (state, action) => {
				state.authPending = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.authPending = false
				state.user = action.payload.user
				state.exp = action.payload.exp

				const { rememberMe } = action.meta.arg

				if (rememberMe) {
					localStorage.setItem('user', JSON.stringify(action.payload.user))
					localStorage.setItem('exp', JSON.stringify(action.payload.exp))
				} else {
					sessionStorage.setItem('user', JSON.stringify(action.payload.user))
					sessionStorage.setItem('exp', JSON.stringify(action.payload.exp))
				}
			})
			.addCase(login.rejected, (state, action) => {
				state.authPending = false
			})

			// logout request
			.addCase(logout.pending, state => {
				state.authPending = false
				state.user = null
				state.exp = null
				state.tokenRenewed = false
				localStorage.removeItem('user')
				localStorage.removeItem('exp')
				sessionStorage.clear()
			})

			// renewToken request
			.addCase(renewToken.fulfilled, (state, action) => {
				localStorage.setItem('exp', JSON.stringify(action.payload.exp))
				state.exp = action.payload.exp
				state.tokenRenewed = true
			})
			// .addCase(renewToken.rejected, (state, action) => {
			// 	state.authPending = false
			// 	state.user = null
			// 	state.exp = null
			// 	state.tokenRenewed = false
			// 	localStorage.removeItem('user')
			// 	localStorage.removeItem('exp')
			// 	sessionStorage.clear()
			// })

			// editUser request
			.addCase(editUser.fulfilled, (state, action) => {
				state.user = action.payload.user

				let userInLocal = localStorage.getItem('user')
				let userInSession = sessionStorage.getItem('user')

				if (userInLocal) {
					localStorage.setItem('user', JSON.stringify(action.payload.user))
				} else if (userInSession) {
					sessionStorage.setItem('user', JSON.stringify(action.payload.user))
				}
			})
	},
})

export default authSlice.reducer
