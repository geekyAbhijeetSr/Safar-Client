const API_URL = process.env.REACT_APP_API_URL

export const getProfileUserRequest = async username => {
	const response = await fetch(`${API_URL}/user/${username}`, {
		credentials: 'include',
		method: 'GET',
	}).then(res => res.json())
	return response
}

export const createPostRequest = payload => {
	return fetch(`${API_URL}/post/create`, {
		credentials: 'include',
		method: 'POST',
		body: payload,
	}).then(res => res.json())
}

export const editPostRequest = payload => {
	const { postId, caption, location } = payload
	return fetch(`${API_URL}/post/edit/${postId}`, {
		credentials: 'include',
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			location,
			caption
		}),
	}).then(res => res.json())
}

export const getUserPostsRequest = async ({
	userId,
	page = '',
	limit = '',
}) => {
	const response = await fetch(
		`${API_URL}/post/userposts/${userId}?page=${page}&limit=${limit}`,
		{
			credentials: 'include',
			method: 'GET',
		}
	).then(res => res.json())
	return response
}

export const getGlobalPostsRequest = async ({ page = '' }) => {
	const response = await fetch(`${API_URL}/post/globalposts?page=${page}`).then(
		res => res.json()
	)

	return response
}

export const getFollowingPostsRequest = async ({ page = '' }) => {
	const response = await fetch(`${API_URL}/post/followingposts?page=${page}`, {
		credentials: 'include',
		method: 'GET',
	}).then(res => res.json())

	return response
}

export const getSavedPostsRequest = async ({ page = '' }) => {
	const response = await fetch(`${API_URL}/post/savedposts?page=${page}`, {
		credentials: 'include',
		method: 'GET',
	}).then(res => res.json())

	return response
}

export const toggleLikePostRequest = async postId => {
	const response = await fetch(`${API_URL}/post/likepost/${postId}`, {
		credentials: 'include',
		method: 'PUT',
	}).then(res => res.json())

	return response
}

export const toggleSavePostRequest = async postId => {
	const response = await fetch(`${API_URL}/post/savepost/${postId}`, {
		credentials: 'include',
		method: 'PUT',
	}).then(res => res.json())

	return response
}

export const followUserRequest = async userId => {
	const response = await fetch(`${API_URL}/user/follow/${userId}`, {
		credentials: 'include',
		method: 'PUT',
	}).then(res => res.json())

	return response
}

export const unfollowUserRequest = async userId => {
	const response = await fetch(`${API_URL}/user/unfollow/${userId}`, {
		credentials: 'include',
		method: 'PUT',
	}).then(res => res.json())

	return response
}

export const deletePostRequest = async postId => {
	return fetch(`${API_URL}/post/delete/${postId}`, {
		credentials: 'include',
		method: 'DELETE'
	}).then(res => res.json())
}
