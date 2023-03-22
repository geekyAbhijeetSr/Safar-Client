import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { followUserRequest, unfollowUserRequest } from './service/post-service'
import { getSearchResultRequest } from './service/search-result-service'

const initialState = {
	query: '',
	fetchingNewSearchResult: false,
	fetchingMoreSearchResult: false,
	searchResult: {
		nextPage: 1,
	},
}

export const getNewSearchResult = createAsyncThunk(
	'search-result/getNewSearchResult',
	async (payload, thunkAPI) => {
		const response = await getSearchResultRequest(payload)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

export const getMoreSearchResult = createAsyncThunk(
	'search-result/getMoreSearchResult',
	async (payload, thunkAPI) => {
		const response = await getSearchResultRequest(payload)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

export const inSearchFollowUser = createAsyncThunk(
	'search-result/followUser',
	async (payload, thunkAPI) => {
		const response = await followUserRequest(payload)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

export const inSearchUnfollowUser = createAsyncThunk(
	'search-result/unfollowUser',
	async (payload, thunkAPI) => {
		const response = await unfollowUserRequest(payload)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

const searchResultSlice = createSlice({
	name: 'search-result',
	initialState: initialState,
	reducers: {
		resetSearchResultState: () => {
			return {
				fetchingNewSearchResult: false,
				fetchingSearchResult: false,
				searchResult: {
					nextPage: 1,
				},
			}
		},
		setSearchQuery: (state, { payload }) => {
			state.query = payload
		},
	},
	extraReducers: builder => {
		builder

			// getNewSearchResult request
			.addCase(getNewSearchResult.pending, (state, action) => {
				state.fetchingNewSearchResult = true
			})
			.addCase(getNewSearchResult.fulfilled, (state, action) => {
				state.fetchingNewSearchResult = false
				state.searchResult = action.payload
			})
			.addCase(getNewSearchResult.rejected, (state, action) => {
				state.searchResult = {
					nextPage: 1,
				}
				state.fetchingNewSearchResult = false
			})

			// getMoreSearchResult request
			.addCase(getMoreSearchResult.pending, (state, action) => {
				state.fetchingMoreSearchResult = true
			})
			.addCase(getMoreSearchResult.fulfilled, (state, action) => {
				state.fetchingMoreSearchResult = false
				if (state.searchResult?.docs) {
					const fetchedDocs = [...state.searchResult.docs, ...action.payload.docs]
					action.payload.docs = fetchedDocs
				}
				state.searchResult = action.payload
			})
			.addCase(getMoreSearchResult.rejected, (state, action) => {
				state.searchResult = {
					nextPage: 1,
				}
				state.fetchingMoreSearchResult = false
			})

			// inSearchFollowUser Request
			.addCase(inSearchFollowUser.fulfilled, (state, action) => {
				const { _id, avatar, username, name, followers, following } =
					action.payload.following

				let temp = {
					_id,
					name,
					username,
					avatar,
					followers,
					following,
				}

				const foundIndex = state.searchResult.docs.findIndex(
					doc => doc._id === temp._id
				)

				state.searchResult.docs[foundIndex] = temp
			})

			// inSearchUnfollowUser Request
			.addCase(inSearchUnfollowUser.fulfilled, (state, action) => {
				const { _id, avatar, username, name, followers, following } =
					action.payload.unfollowing

				let temp = {
					_id,
					name,
					username,
					avatar,
					followers,
					following,
				}

				const foundIndex = state.searchResult.docs.findIndex(
					doc => doc._id === temp._id
				)

				state.searchResult.docs[foundIndex] = temp
			})
	},
})

export const { resetSearchResultState, setSearchQuery } =
	searchResultSlice.actions

export default searchResultSlice.reducer
