const API_URL = process.env.REACT_APP_API_URL

export const signupRequest = payload => {
	return fetch(`${API_URL}/auth/signup`, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	}).then(res => res.json())
}

export const loginRequest = payload => {
	return fetch(`${API_URL}/auth/login`, {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	}).then(res => res.json())
}

export const logoutRequest = async () => {
	await fetch(`${API_URL}/auth/logout`, {
		credentials: 'include',
		method: 'POST',
	})
}

export const renewTokenRequest = (userId) => {
	return fetch(`${API_URL}/auth/renew-token/${userId}`, {
		credentials: 'include',
		method: 'POST',
	}).then(res => res.json())
}

export const editUserRequest = async (userId, payload) => {
	return fetch(`${API_URL}/user/edit/${userId}`, {
		credentials: 'include',
		method: 'PUT',
		body: payload
	}).then(res => res.json())
}

