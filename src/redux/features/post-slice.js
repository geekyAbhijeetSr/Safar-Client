import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import {
	createPostRequest,
	deletePostRequest,
	editPostRequest,
	followUserRequest,
	getFollowingPostsRequest,
	getGlobalPostsRequest,
	getProfileUserRequest,
	getSavedPostsRequest,
	getUserPostsRequest,
	toggleLikePostRequest,
	toggleSavePostRequest,
	unfollowUserRequest,
} from './service/post-service'

const initialState = {
	fetchingProfileUser: false,
	profileUser: null,

	fetchingUserPosts: false,
	userPosts: {
		nextPage: 1,
	},

	fetchingGlobalPosts: false,
	globalPosts: {
		nextPage: 1,
	},

	fetchingFollowingPosts: false,
	followingPosts: {
		nextPage: 1,
	},

	fetchingSavedPosts: false,
	savedPosts: {
		nextPage: 1,
	},
}

export const getProfileUser = createAsyncThunk(
	'post/getProfileUser',
	async (payload, thunkAPI) => {
		const response = await getProfileUserRequest(payload)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

export const createPost = createAsyncThunk(
	'post/create',
	async (payload, thunkAPI) => {
		let success = false
		let data

		await toast.promise(createPostRequest(payload), {
			loading: 'Posting...',
			success: res => {
				data = res
				if (!res.ok) throw new Error(res.errorMsg)
				success = true
				return 'Posted successfully!'
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

export const editPost = createAsyncThunk(
	'post/edit',
	async (payload, thunkAPI) => {
		let success = false
		let data

		await toast.promise(editPostRequest(payload), {
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

export const getUserPosts = createAsyncThunk(
	'post/getUserPosts',
	async (payload, thunkAPI) => {
		const response = await getUserPostsRequest(payload)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

export const getGlobalPosts = createAsyncThunk(
	'post/getAllPosts',
	async (payload, thunkAPI) => {
		const response = await getGlobalPostsRequest(payload)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

export const getFollowingPosts = createAsyncThunk(
	'post/getFollowingPosts',
	async (payload, thunkAPI) => {
		const response = await getFollowingPostsRequest(payload)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

export const getSavedPosts = createAsyncThunk(
	'post/getSavedPosts',
	async (payload, thunkAPI) => {
		const response = await getSavedPostsRequest(payload)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

export const toggleLikePost = createAsyncThunk(
	'post/toggleLikePost',
	async (payload, thunkAPI) => {
		const { postId } = payload
		const response = await toggleLikePostRequest(postId)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

export const toggleSavePost = createAsyncThunk(
	'post/toggleSavePost',
	async (payload, thunkAPI) => {
		const response = await toggleSavePostRequest(payload)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

export const deletePost = createAsyncThunk(
	'post/delete',
	async (payload, thunkAPI) => {
		let success = false
		let data

		await toast.promise(deletePostRequest(payload), {
			loading: 'Deleting...',
			success: res => {
				data = res
				if (!res.ok) throw new Error(res.errorMsg)
				success = true
				return 'Deleted successfully!'
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

export const followUser = createAsyncThunk(
	'followUser',
	async (payload, thunkAPI) => {
		const response = await followUserRequest(payload)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

export const unfollowUser = createAsyncThunk(
	'unfollowUser',
	async (payload, thunkAPI) => {
		const response = await unfollowUserRequest(payload)
		if (response.ok) {
			return response
		}
		return thunkAPI.rejectWithValue(response)
	}
)

const postSlice = createSlice({
	name: 'post',
	initialState: initialState,
	reducers: {
		resetPostState: (state, action) => {
			return {
				fetchingProfileUser: false,
				profileUser: null,

				fetchingUserPosts: false,
				userPosts: {
					nextPage: 1,
				},

				fetchingGlobalPosts: false,
				globalPosts: {
					nextPage: 1,
				},

				fetchingFollowingPosts: false,
				followingPosts: {
					nextPage: 1,
				},

				fetchingSavedPosts: false,
				savedPosts: {
					nextPage: 1,
				},
			}
		},
		updateProfile: (state, { payload }) => {
			if (payload._id === state.profileUser?._id) {
				state.profileUser.avatar = payload.avatar
				state.profileUser.banner = payload.banner
				state.profileUser.username = payload.username
				state.profileUser.name = payload.name
				state.profileUser.bio = payload.bio

				if (state.userPosts?.docs?.length > 0) {
					let tmp = state.userPosts.docs.map(post => {
						post.author.name = payload.name
						post.author.username = payload.username
						post.author.avatar = payload.avatar

						return post
					})

					state.userPosts.docs = tmp
				}

				if (state.globalPosts?.docs?.length > 0) {
					let tmp = state.globalPosts.docs.map(post => {
						if (post.author._id === payload._id) {
							post.author.name = payload.name
							post.author.username = payload.username
							post.author.avatar = payload.avatar
						}

						return post
					})

					state.globalPosts.docs = tmp
				}

				if (state.savedPosts?.docs?.length > 0) {
					let tmp = state.savedPosts.docs.map(post => {
						if (post.author._id === payload._id) {
							post.author.name = payload.name
							post.author.username = payload.username
							post.author.avatar = payload.avatar
						}

						return post
					})

					state.savedPosts.docs = tmp
				}
			}
		},
	},
	extraReducers: builder => {
		builder

			// getProfileUser request
			.addCase(getProfileUser.pending, (state, action) => {
				state.fetchingProfileUser = true
			})
			.addCase(getProfileUser.fulfilled, (state, action) => {
				if (state.profileUser?.username !== action.payload.user.username) {
					state.profileUser = action.payload.user
					state.userPosts = {
						nextPage: 1,
					}
				}
				state.fetchingProfileUser = false
			})
			.addCase(getProfileUser.rejected, (state, action) => {
				state.profileUser = null
				state.fetchingProfileUser = false
				state.userPosts = {
					nextPage: 1,
				}
			})

			// createPost request
			.addCase(createPost.fulfilled, (state, action) => {
				if (
					state.userPosts?.docs &&
					state.userPosts?.docs[0]?.author._id ===
						action.payload.post.author._id
				) {
					state.userPosts.docs.unshift(action.payload.post)
					state.profileUser.noOfPosts++
				}

				state.globalPosts.docs.unshift(action.payload.post)
			})

			// editPost request
			.addCase(editPost.fulfilled, (state, action) => {
				const post = action.payload.post

				if (state.userPosts?.docs?.length > 0) {
					const foundIndex = state.userPosts.docs.findIndex(
						doc => doc._id === post._id
					)

					if (foundIndex !== -1) {
						state.userPosts.docs[foundIndex] = post
					}
				}

				if (state.globalPosts?.docs?.length > 0) {
					const foundIndex = state.globalPosts.docs.findIndex(
						doc => doc._id === post._id
					)

					if (foundIndex !== -1) {
						state.globalPosts.docs[foundIndex] = post
					}
				}

				if (state.savedPosts?.docs?.length > 0) {
					const foundIndex = state.savedPosts.docs.findIndex(
						doc => doc._id === post._id
					)

					if (foundIndex !== -1) {
						state.savedPosts.docs[foundIndex] = post
					}
				}
			})

			// deletePost request
			.addCase(deletePost.fulfilled, (state, action) => {
				const postId = action.payload.postId

				if (state.userPosts?.docs?.length > 0) {
					const foundIndex = state.userPosts.docs.findIndex(
						doc => doc._id === postId
					)

					if (foundIndex !== -1) {
						state.userPosts.docs.splice(foundIndex, 1)
					}
				}

				if (state.globalPosts?.docs?.length > 0) {
					const foundIndex = state.globalPosts.docs.findIndex(
						doc => doc._id === postId
					)

					if (foundIndex !== -1) {
						state.globalPosts.docs.splice(foundIndex, 1)
					}
				}

				if (state.savedPosts?.docs?.length > 0) {
					const foundIndex = state.savedPosts.docs.findIndex(
						doc => doc._id === postId
					)

					if (foundIndex !== -1) {
						state.savedPosts.docs.splice(foundIndex, 1)
					}
				}

				if (state.profileUser?.noOfPosts) {
					state.profileUser.noOfPosts--
				}
			})

			// getUserPosts request
			.addCase(getUserPosts.pending, (state, action) => {
				state.fetchingUserPosts = true
			})
			.addCase(getUserPosts.fulfilled, (state, action) => {
				state.fetchingUserPosts = false
				if (state.userPosts?.docs) {
					const fetchedDocs = [...state.userPosts.docs, ...action.payload.docs]
					action.payload.docs = fetchedDocs
				}
				state.userPosts = action.payload
			})
			.addCase(getUserPosts.rejected, (state, action) => {
				state.userPosts = {
					nextPage: 1,
				}
				state.fetchingUserPosts = false
			})

			// getGlobalPosts request
			.addCase(getGlobalPosts.pending, (state, action) => {
				state.fetchingGlobalPosts = true
			})
			.addCase(getGlobalPosts.fulfilled, (state, action) => {
				state.fetchingGlobalPosts = false

				if (state.globalPosts?.docs) {
					const fetchedDocs = [...state.userPosts.docs, ...action.payload.docs]
					action.payload.docs = fetchedDocs
				}
				state.globalPosts = action.payload
			})
			.addCase(getGlobalPosts.rejected, (state, action) => {
				state.globalPosts = {
					nextPage: 1,
				}
				state.fetchingGlobalPosts = false
			})

			// getFollowingPosts request
			.addCase(getFollowingPosts.pending, (state, action) => {
				state.fetchingFollowingPosts = true
			})
			.addCase(getFollowingPosts.fulfilled, (state, action) => {
				state.fetchingFollowingPosts = false

				if (state.followingPosts?.docs) {
					const fetchedDocs = [...state.userPosts.docs, ...action.payload.docs]
					action.payload.docs = fetchedDocs
				}

				state.followingPosts = action.payload
			})
			.addCase(getFollowingPosts.rejected, (state, action) => {
				state.followingPosts = {
					nextPage: 1,
				}
				state.fetchingFollowingPosts = false
			})

			// getSavedPosts request
			.addCase(getSavedPosts.pending, (state, action) => {
				state.fetchingSavedPosts = true
			})
			.addCase(getSavedPosts.fulfilled, (state, action) => {
				state.fetchingSavedPosts = false

				if (state.savedPosts?.docs?.length > 0) {
					const fetchedDocs = [...state.userPosts.docs, ...action.payload.docs]
					action.payload.docs = fetchedDocs
				}

				state.savedPosts = action.payload
			})
			.addCase(getSavedPosts.rejected, (state, action) => {
				state.followingPosts = {
					nextPage: 1,
				}
				state.fetchingSavedPosts = false
			})

			// toggleLikePost request
			.addCase(toggleLikePost.pending, (state, action) => {
				const { postId, currentUser } = action.meta.arg

				if (state.userPosts?.docs?.length > 0) {
					const Posts = [...state.userPosts.docs]
					const indexOfPost = Posts.findIndex(post => post._id === postId)

					if (Posts[indexOfPost].likedBy.includes(currentUser)) {
						// unlike post
						const indexOfCurrUser = Posts[indexOfPost].likedBy.findIndex(
							user => user === currentUser
						)
						Posts[indexOfPost].likedBy.splice(indexOfCurrUser, 1)
						Posts[indexOfPost].noOfLikes--
					} else {
						// like post
						Posts[indexOfPost].likedBy.push(currentUser)
						Posts[indexOfPost].noOfLikes++
					}

					state.userPosts.docs = Posts
				}

				if (state.globalPosts?.docs?.length > 0) {
					const Posts = [...state.globalPosts.docs]
					const indexOfPost = Posts.findIndex(post => post._id === postId)

					if (Posts[indexOfPost].likedBy.includes(currentUser)) {
						// unlike post
						const indexOfCurrUser = Posts[indexOfPost].likedBy.findIndex(
							user => user === currentUser
						)
						Posts[indexOfPost].likedBy.splice(indexOfCurrUser, 1)
						Posts[indexOfPost].noOfLikes--
					} else {
						// like post
						Posts[indexOfPost].likedBy.push(currentUser)
						Posts[indexOfPost].noOfLikes++
					}

					state.globalPosts.docs = Posts
				}

				if (state.followingPosts?.docs?.length > 0) {
					const Posts = [...state.followingPosts.docs]
					const indexOfPost = Posts.findIndex(post => post._id === postId)

					if (Posts[indexOfPost].likedBy.includes(currentUser)) {
						// unlike post
						const indexOfCurrUser = Posts[indexOfPost].likedBy.findIndex(
							user => user === currentUser
						)
						Posts[indexOfPost].likedBy.splice(indexOfCurrUser, 1)
						Posts[indexOfPost].noOfLikes--
					} else {
						// like post
						Posts[indexOfPost].likedBy.push(currentUser)
						Posts[indexOfPost].noOfLikes++
					}

					state.followingPosts.docs = Posts
				}

				if (state.savedPosts?.docs?.length > 0) {
					const Posts = [...state.savedPosts.docs]
					const indexOfPost = Posts.findIndex(post => post._id === postId)

					if (Posts[indexOfPost].likedBy.includes(currentUser)) {
						// unlike post
						const indexOfCurrUser = Posts[indexOfPost].likedBy.findIndex(
							user => user === currentUser
						)
						Posts[indexOfPost].likedBy.splice(indexOfCurrUser, 1)
						Posts[indexOfPost].noOfLikes--
					} else {
						// like post
						Posts[indexOfPost].likedBy.push(currentUser)
						Posts[indexOfPost].noOfLikes++
					}

					state.savedPosts.docs = Posts
				}
			})
			.addCase(toggleLikePost.fulfilled, (state, action) => {
				// const post = action.payload.post

				// if (state.userPosts?.docs?.length > 0) {
				// 	const foundIndex = state.userPosts.docs.findIndex(
				// 		doc => doc._id === post._id
				// 	)

				// 	if (foundIndex !== -1) {
				// 		state.userPosts.docs[foundIndex] = post
				// 	}
				// }

				// if (state.globalPosts?.docs?.length > 0) {
				// 	const foundIndex = state.globalPosts.docs.findIndex(
				// 		doc => doc._id === post._id
				// 	)

				// 	if (foundIndex !== -1) {
				// 		state.globalPosts.docs[foundIndex] = post
				// 	}
				// }

				// if (state.followingPosts?.docs?.length > 0) {
				// 	const foundIndex = state.followingPosts.docs.findIndex(
				// 		doc => doc._id === post._id
				// 	)

				// 	if (foundIndex !== -1) {
				// 		state.followingPosts.docs[foundIndex] = post
				// 	}
				// }

				// if (state.savedPosts?.docs?.length > 0) {
				// 	const foundIndex = state.savedPosts.docs.findIndex(
				// 		doc => doc._id === post._id
				// 	)

				// 	if (foundIndex !== -1) {
				// 		state.savedPosts.docs[foundIndex] = post
				// 	}
				// }
			})

			// toggleSavePost request
			.addCase(toggleSavePost.fulfilled, (state, action) => {
				const post = action.payload.post

				if (state.userPosts?.docs?.length > 0) {
					const foundIndex = state.userPosts.docs.findIndex(
						doc => doc._id === post._id
					)

					if (foundIndex !== -1) {
						state.userPosts.docs[foundIndex] = post
					}
				}

				if (state.globalPosts?.docs?.length > 0) {
					const foundIndex = state.globalPosts.docs.findIndex(
						doc => doc._id === post._id
					)

					if (foundIndex !== -1) {
						state.globalPosts.docs[foundIndex] = post
					}
				}

				if (state.followingPosts?.docs?.length > 0) {
					const foundIndex = state.followingPosts.docs.findIndex(
						doc => doc._id === post._id
					)

					if (foundIndex !== -1) {
						state.followingPosts.docs[foundIndex] = post
					}
				}

				if (state.savedPosts?.docs?.length > 0) {
					const foundIndex = state.savedPosts.docs.findIndex(
						doc => doc._id === post._id
					)

					if (foundIndex !== -1) {
						state.savedPosts.docs[foundIndex] = post
					} else {
						state.savedPosts.docs.unshift(post)
					}
				}
			})

			// followUser Request
			.addCase(followUser.fulfilled, (state, action) => {
				const payload = action.payload

				if (
					state.profileUser &&
					state.profileUser._id === payload.following._id
				) {
					state.profileUser = payload.following
				}

				if (
					state.userPosts?.docs?.length > 0 &&
					state.userPosts?.docs[0].author._id === payload.following._id
				) {
					const userPosts = state.userPosts.docs.map(doc => {
						doc.author.followers.push(payload.user._id)
						return doc
					})

					state.userPosts.docs = userPosts
				}

				if (state.globalPosts?.docs?.length > 0) {
					const globalPosts = state.globalPosts.docs.map(doc => {
						if (doc.author._id === payload.following._id) {
							doc.author.followers.push(payload.user._id)
						}
						return doc
					})

					state.globalPosts.docs = globalPosts
				}

				if (state.followingPosts?.docs?.length > 0) {
					const followingPosts = state.followingPosts.docs.map(doc => {
						if (doc.author._id === payload.following._id) {
							doc.author.followers.push(payload.user._id)
						}
						return doc
					})

					state.followingPosts.docs = followingPosts
				}

				if (state.savedPosts?.docs?.length > 0) {
					const savedPosts = state.savedPosts.docs.map(doc => {
						if (doc.author._id === payload.following._id) {
							doc.author.followers.push(payload.user._id)
						}
						return doc
					})

					state.savedPosts.docs = savedPosts
				}
			})

			// unfollowUser Request
			.addCase(unfollowUser.fulfilled, (state, action) => {
				const payload = action.payload

				if (
					state.profileUser &&
					state.profileUser._id === payload.unfollowing._id
				) {
					state.profileUser = payload.unfollowing
				}

				if (
					state.userPosts?.docs?.length > 0 &&
					state.userPosts?.docs[0].author._id === payload.unfollowing._id
				) {
					const userPosts = state.userPosts.docs.map(doc => {
						const foundIndex = doc.author.followers.findIndex(
							f => f === payload.user._id
						)
						doc.author.followers.splice(foundIndex, 1)
						return doc
					})

					state.userPosts.docs = userPosts
				}

				if (state.globalPosts?.docs?.length > 0) {
					const globalPosts = state.globalPosts.docs.map(doc => {
						if (doc.author._id === payload.unfollowing._id) {
							const foundIndex = doc.author.followers.findIndex(
								f => f === payload.user._id
							)
							doc.author.followers.splice(foundIndex, 1)
						}
						return doc
					})

					state.globalPosts.docs = globalPosts
				}

				if (state.followingPosts?.docs?.length > 0) {
					const followingPosts = state.followingPosts.docs.map(doc => {
						if (doc.author._id === payload.unfollowing._id) {
							const foundIndex = doc.author.followers.findIndex(
								f => f === payload.user._id
							)
							doc.author.followers.splice(foundIndex, 1)
						}
						return doc
					})

					state.followingPosts.docs = followingPosts
				}

				if (state.savedPosts?.docs?.length > 0) {
					const savedPosts = state.savedPosts.docs.map(doc => {
						if (doc.author._id === payload.unfollowing._id) {
							const foundIndex = doc.author.followers.findIndex(
								f => f === payload.user._id
							)
							doc.author.followers.splice(foundIndex, 1)
						}
						return doc
					})

					state.savedPosts.docs = savedPosts
				}
			})
	},
})

export const { resetPostState, updateProfile } = postSlice.actions

export default postSlice.reducer
