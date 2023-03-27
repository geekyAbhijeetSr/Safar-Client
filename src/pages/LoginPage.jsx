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
	Checkbox,
	Stack,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import safar from '../assets/images/safar.jpg'
import { useFormik } from 'formik'
import logInValidation from '../validations/loginValidation'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/features/auth-slice'

function LoginPage() {
	const [showPassword, setShowPassword] = useState(false)
	const [rememberMe, setRememberMe] = useState(false)

	document.title = 'Safar - Welcome'

	const handleChange = event => {
		setRememberMe(event.target.checked)
	}
	const isLogin = useSelector(state => !!state.auth.user)
	const theme = useTheme()
	const navigate = useNavigate()
	const matchMdUp = useMediaQuery(theme.breakpoints.up('md'))
	const matchSmUp = useMediaQuery(theme.breakpoints.up('sm'))
	const match375Up = useMediaQuery('(min-width: 375px)')
	const dispatch = useDispatch()
	const formik = useFormik({
		initialValues: {
			username_or_email: '',
			password: '',
		},
		validationSchema: logInValidation,
		onSubmit: (values, action) => {
			const payload = {
				values,
				rememberMe,
			}
			dispatch(login(payload))
		},
	})

	const handleClickShowPassword = () => {
		setShowPassword(prevState => !prevState)
	}

	if (isLogin) navigate('/')
	useEffect(() => {
		if (isLogin) {
			navigate('/')
		}
	}, [isLogin, navigate])

	const textfieldSx = {
		width: '100%',
		marginBottom: '1rem',
	}

	const link = {
		color: theme.palette.primary.main,
		cursor: 'pointer',
		fontWeight: '500',
	}

	const forgotPassSx = {
		display: 'block',
		textAlign: 'center',
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
					marginTop: matchSmUp ? 0 : '-6rem',
				}}
			>
				{matchMdUp && (
					<Box
						sx={{
							flex: 1,
							padding: '1.5rem',
							background: `radial-gradient(circle, rgba(0,113,216,0.4) 0%, rgba(12,23,57,0.4) 100%), url(${safar}) center center no-repeat`,
							backgroundSize: 'cover',
						}}
					></Box>
				)}
				<Box
					sx={{
						flex: 1,
						padding: '1.5rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography
						component='h3'
						variant='h3'
						className='logo-font'
						sx={{
							color: theme.palette.primary.main,
							textAlign: 'center',
						}}
					>
						Safar
					</Typography>
					<Typography
						component='h5'
						variant='h6'
						sx={{
							color: theme.palette.text.secondary,
							textAlign: 'center',
							marginBottom: '1rem',
						}}
					>
						Welcome back
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
							label='Username or email'
							type='text'
							name='username_or_email'
							onChange={formik.handleChange}
							value={formik.values.username_or_email}
							error={
								!!(
									formik.touched.username_or_email &&
									formik.errors.username_or_email
								)
							}
							helperText={
								formik.touched.username_or_email &&
								formik.errors.username_or_email
							}
							onBlur={formik.handleBlur}
						/>
						<TextField
							size='small'
							sx={{ ...textfieldSx, marginBottom: '0.25rem' }}
							label='Password'
							type={showPassword ? 'text' : 'password'}
							name='password'
							onChange={formik.handleChange}
							value={formik.values.password}
							error={!!(formik.touched.password && formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
							onBlur={formik.handleBlur}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton onClick={handleClickShowPassword} edge='end'>
											{showPassword ? (
												<VisibilityOffOutlined />
											) : (
												<VisibilityOutlined />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						<Stack
							direction='row'
							alignItems='center'
							justifyContent='space-between'
						>
							<Stack direction='row' alignItems='center'>
								<Checkbox
									checked={rememberMe}
									onChange={handleChange}
									size='small'
								/>
								<Typography component='p' variant='caption'>
									Remember me
								</Typography>
							</Stack>

							<Typography
								sx={{ ...link, ...forgotPassSx }}
								component='a'
								variant='caption'
								onClick={() => {
									navigate('/forgot-password')
								}}
							>
								Forgot password?
							</Typography>
						</Stack>

						<Button
							sx={{
								display: 'block',
								margin: '1rem auto',
							}}
							variant='contained'
							type='submit'
						>
							Log In
						</Button>
						<Typography
							sx={{
								textAlign: 'center',
								color: theme.palette.text.secondary,
							}}
							component='p'
							variant='caption'
						>
							Don't have an account?{' '}
							<Typography
								sx={link}
								component='a'
								variant='caption'
								onClick={() => {
									navigate('/accounts/signup')
								}}
							>
								Sign Up
							</Typography>
						</Typography>
					</form>
				</Box>
			</Paper>
		</Box>
	)
}

export default LoginPage
