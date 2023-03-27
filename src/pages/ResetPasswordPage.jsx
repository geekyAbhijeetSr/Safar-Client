import {
	Box,
	Button,
	Paper,
	TextField,
	Typography,
	useTheme,
	useMediaQuery,
	InputAdornment,
	IconButton,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { Player } from '@lottiefiles/react-lottie-player'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import ResetLinkTokenError from '../components/ResetLinkTokenError'
import { toast } from 'react-hot-toast'
import resetPasswordValidation from '../validations/resetPasswordValidation'
import Loading from '../components/Loading'

function ResetPasswordPage() {
	const theme = useTheme()
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)

	document.title = 'Safar - Reset Password'

	const token = queryParams.get('token')
	const [showPassword, setShowPassword] = useState({
		new: false,
		conf: false,
	})

	const [verifyingToken, setVerifyingToken] = useState(false)
	const [errorMsg, setErrorMsg] = useState()
	const [passwordReset, setResetPassword] = useState(false)

	const navigate = useNavigate()

	const playerRef = useRef()

	const matchMdUp = useMediaQuery(theme.breakpoints.up('md'))
	const matchSmUp = useMediaQuery(theme.breakpoints.up('sm'))
	const match375Up = useMediaQuery('(min-width: 375px)')
	const formik = useFormik({
		initialValues: {
			new_password: '',
			confirm_password: '',
		},
		validationSchema: resetPasswordValidation,
		onSubmit: (values, action) => {
			;(async () => {
				const request = () => {
					return fetch(
						`${process.env.REACT_APP_API_URL}/auth/reset-password/${token}`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(values),
						}
					).then(res => res.json())
				}

				await toast.promise(request(), {
					loading: 'Processing...',
					success: res => {
						if (!res.ok) throw new Error(res.errorMsg)

						setResetPassword(true)
						action.resetForm()
						return 'Password has been reset successfully!'
					},
					error: err => {
						return err.toString().split(': ')[1]
					},
				})
			})()
		},
	})

	const handleClickShowPassword = key => {
		setShowPassword(prevState => {
			return { ...prevState, [key]: !prevState[key] }
		})
	}

	const textfieldSx = {
		width: '100%',
		marginBottom: '1rem',
	}

	useEffect(() => {
		;(async () => {
			if (token) {
				setVerifyingToken(true)
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/auth/verify-token/${token}`,
					{
						method: 'POST',
					}
				).then(res => res.json())

				setVerifyingToken(false)

				if (!response.ok) {
					setErrorMsg(response.errorMsg)
				}
			}
		})()
	}, [token])

	useEffect(() => {
		let timerId
		if (playerRef.current) {
			timerId = setTimeout(() => {
				playerRef.current.pause()
			}, 2000)
		}

		return () => {
			clearTimeout(timerId)
		}
	}, [passwordReset])

	if (passwordReset) {
		return (
			<Box
				sx={{
					height: '100vh',
					display: 'grid',
					placeItems: 'center',
					background: matchSmUp
						? theme.palette.background.default
						: theme.palette.background.paper,
				}}
			>
				<Paper
					sx={{
						width: matchMdUp ? 750 : match375Up ? 375 : '100%',
						minHeight: match375Up ? 600 : 400,
						display: 'flex',
						flexDirection: 'row',
						background: theme.palette.background.paper,
						overflow: 'hidden',
						filter: matchSmUp
							? 'drop-shadow(0px 2px 8px rgba(0,0,0,0.05))'
							: 'none',
						marginTop: matchSmUp ? 0 : '-4rem',
					}}
				>
					{matchMdUp && (
						<Box
							sx={{
								flex: 1,
							}}
						>
							<Player
								autoplay
								speed={2}
								src='https://assets5.lottiefiles.com/packages/lf20_bmfghkq7.json'
								style={{ width: '100%', marginTop: '7rem' }}
								ref={playerRef}
							/>
						</Box>
					)}
					<Box
						sx={{
							flex: 1,
							padding: '1.5rem',
							display: 'flex',
							alignItems: 'flex-start',
							justifyContent: 'center',
							flexDirection: 'column',
						}}
					>
						<Typography
							component='h4'
							variant='h3'
							sx={{
								color: theme.palette.primary.main,
								textAlign: 'left',
								marginBottom: '0.5rem',
							}}
						>
							Password reset successfully
						</Typography>
						<Typography
							component='h5'
							variant='subtitle1'
							sx={{
								color: theme.palette.text.secondary,
								textAlign: 'left',
								marginBottom: '1rem',
							}}
						>
							Your password has been successfully reset. Please use your new
							password to log in to your account.
						</Typography>

						<Button
							sx={{
								display: 'block',
							}}
							variant='contained'
							onClick={() => {
								navigate('/accounts/login')
							}}
						>
							Go to Login Page
						</Button>
					</Box>
				</Paper>
			</Box>
		)
	}

	if (!token) {
		return (
			<ResetLinkTokenError
				errorHeading='Token is required!'
				errorMsg={`We're sorry, but it appears that the password reset link you are trying to use does not contain a valid token. Please ensure that you are using the correct link, or initiate a new password reset request to receive a fresh link containing a valid token.`}
			/>
		)
	}

	if (errorMsg === 'Link expired!') {
		return (
			<ResetLinkTokenError
				errorHeading={errorMsg}
				errorMsg={`We're sorry, but it appears that the password reset link you are trying to use has expired. Please initiate a new password reset request to receive a fresh link.`}
			/>
		)
	}

	if (errorMsg === 'Link already used!') {
		return (
			<ResetLinkTokenError
				errorHeading={errorMsg}
				errorMsg={`We're sorry, but it looks like the password reset link you are trying to use has already been utilized. For security reasons, we are unable to process the request again. Please initiate a new password reset request to receive a fresh link.`}
			/>
		)
	}

	if (errorMsg === 'Invalid token!') {
		return (
			<ResetLinkTokenError
				errorHeading={errorMsg}
				errorMsg={`We apologize, but the password reset link you are attempting to use contains an invalid token. Please ensure that you are using the correct link, or initiate a new password reset request to receive a fresh link.`}
			/>
		)
	}

	if (errorMsg) {
		return (
			<ResetLinkTokenError
				errorHeading='Something went wrong!'
				errorMsg={`We apologize, but something went wrong while processing your password reset request. Please try again later or initiate a new password reset request to receive a fresh link.`}
			/>
		)
	}

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'grid',
				placeItems: 'center',
				background: matchSmUp
					? theme.palette.background.default
					: theme.palette.background.paper,
			}}
		>
			{verifyingToken ? (
				<Loading />
			) : (
				<Paper
					sx={{
						width: matchMdUp ? 750 : match375Up ? 375 : '100%',
						minHeight: match375Up ? 600 : 400,
						display: 'flex',
						flexDirection: 'row',
						background: theme.palette.background.paper,
						overflow: 'hidden',
						filter: matchSmUp
							? 'drop-shadow(0px 2px 8px rgba(0,0,0,0.05))'
							: 'none',
						marginTop: matchSmUp ? 0 : '-4rem',
					}}
				>
					{matchMdUp && (
						<Box
							sx={{
								flex: 1,
							}}
						>
							<Player
								autoplay
								speed={0.75}
								loop
								src='https://assets2.lottiefiles.com/packages/lf20_cgjrfdzx.json'
								style={{ width: '95%', marginTop: '7rem' }}
							/>
						</Box>
					)}
					<Box
						sx={{
							flex: 1,
							padding: '1.5rem',
							display: 'flex',
							alignItems: 'flex-start',
							justifyContent: 'center',
							flexDirection: 'column',
						}}
					>
						<Typography
							component='h4'
							variant='h3'
							sx={{
								color: theme.palette.primary.main,
								textAlign: 'left',
								marginBottom: '0.5rem',
							}}
						>
							Reset Your Password
						</Typography>
						<Typography
							component='h5'
							variant='subtitle1'
							sx={{
								color: theme.palette.text.secondary,
								textAlign: 'left',
								marginBottom: '1rem',
							}}
						>
							Enter your new password
						</Typography>
						<form
							style={{
								width: '100%',
							}}
							onSubmit={formik.handleSubmit}
						>
							<TextField
								size='small'
								sx={textfieldSx}
								label='New Password'
								type={showPassword.new ? 'text' : 'password'}
								name='new_password'
								onChange={formik.handleChange}
								value={formik.values.new_password}
								error={
									!!(formik.touched.new_password && formik.errors.new_password)
								}
								helperText={
									formik.touched.new_password && formik.errors.new_password
								}
								onBlur={formik.handleBlur}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												onClick={() => handleClickShowPassword('new')}
												edge='end'
											>
												{showPassword.new ? (
													<VisibilityOffOutlined />
												) : (
													<VisibilityOutlined />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>

							<TextField
								size='small'
								sx={textfieldSx}
								label='Confirm Password'
								name='confirm_password'
								type={showPassword.conf ? 'text' : 'password'}
								onChange={formik.handleChange}
								value={formik.values.confirm_password}
								error={
									!!(
										formik.touched.confirm_password &&
										formik.errors.confirm_password
									)
								}
								helperText={
									formik.touched.confirm_password &&
									formik.errors.confirm_password
								}
								onBlur={formik.handleBlur}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												onClick={() => handleClickShowPassword('conf')}
												edge='end'
											>
												{showPassword.conf ? (
													<VisibilityOffOutlined />
												) : (
													<VisibilityOutlined />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>

							<Button
								sx={{
									display: 'block',
								}}
								variant='contained'
								type='submit'
							>
								Reset Password
							</Button>
						</form>
					</Box>
				</Paper>
			)}
		</Box>
	)
}

export default ResetPasswordPage
