const API_URL = process.env.REACT_APP_API_URL

export const getSearchResultRequest = async ({
	search_query = '',
	page = '',
	limit = '',
}) => {
	const response = await fetch(
		`${API_URL}/user/search-users?search_query=${search_query}&page=${page}&limit=${limit}`,
		{
			credentials: 'include',
			method: 'GET',
		}
	).then(res => res.json())
	return response
}