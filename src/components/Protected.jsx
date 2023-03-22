import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({ isLogin, children }) {
	if (!isLogin) {
		return <Navigate to={'/accounts/login'} replace />
	}
	return children
}
export default Protected
