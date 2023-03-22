import { useTheme } from '@mui/material'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Protected from './components/Protected'
import ScrollToTop from './helper/ScrollToTop'
import ChangePasswordPage from './pages/ChangePasswordPage'
import ChangeThemePage from './pages/ChangeThemePage'
import EditProfilePage from './pages/EditProfilePage'
import FollowingFeedPage from './pages/FollowingFeedPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import GlobalFeed from './pages/GlobalFeedPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SavedPage from './pages/SavedPage'
import SearchResultPage from './pages/SearchResultPage'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import { updateProfile } from './redux/features/post-slice'
import Layout from './shared/Layout'

function App() {
	const isLogin = useSelector(state => !!state.auth.user)
	const { user } = useSelector(state => state.auth)
	const dispatch = useDispatch()
	const theme = useTheme()

	useEffect(() => {
		if (!!user) {
			dispatch(updateProfile(user))
		}
	}, [user, dispatch])

	return (
		<div>
			<ScrollToTop />
			<Routes>
				<Route
					path='/'
					element={
						<Protected isLogin={isLogin}>
							<Layout />
						</Protected>
					}
				>
					<Route
						path=''
						element={
							<Protected isLogin={isLogin}>
								<GlobalFeed />
							</Protected>
						}
					/>
					<Route
						path='following'
						element={
							<Protected isLogin={isLogin}>
								<FollowingFeedPage />
							</Protected>
						}
					/>
					<Route
						path='saved'
						element={
							<Protected isLogin={isLogin}>
								<SavedPage />
							</Protected>
						}
					/>
					<Route
						path='result'
						element={
							<Protected isLogin={isLogin}>
								<SearchResultPage />
							</Protected>
						}
					/>
					<Route
						path='settings'
						element={
							<Protected isLogin={isLogin}>
								<SettingsPage />
							</Protected>
						}
					/>
					<Route
						path='settings/editprofile'
						element={
							<Protected isLogin={isLogin}>
								<EditProfilePage />
							</Protected>
						}
					/>
					<Route
						path='settings/changepassword'
						element={
							<Protected isLogin={isLogin}>
								<ChangePasswordPage />
							</Protected>
						}
					/>
					<Route
						path='settings/changetheme'
						element={
							<Protected isLogin={isLogin}>
								<ChangeThemePage />
							</Protected>
						}
					/>
					<Route
						path=':username'
						element={
							<Protected isLogin={isLogin}>
								<ProfilePage />
							</Protected>
						}
					/>
				</Route>
				{!isLogin && (
					<>
						<Route path='/accounts/login' element={<LoginPage />} />
						<Route path='/accounts/signup' element={<SignUpPage />} />
						<Route path='/forgot-password' element={<ForgotPasswordPage />} />
						<Route path='/reset-password' element={<ResetPasswordPage />} />
					</>
				)}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>

			<Toaster
				toastOptions={{
					style: {
						background: theme.palette.background.paper,
						color: theme.palette.text.primary,
					},
				}}
			/>
		</div>
	)
}

export default App
