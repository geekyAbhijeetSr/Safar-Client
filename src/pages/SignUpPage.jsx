import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	Paper,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import safar from '../assets/images/safar2.jpg'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { useFormik } from 'formik'
import signUpValidation from '../validations/signupValidation'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../redux/features/auth-slice'

function SignUpPage() {
	const [showPassword, setShowPassword] = useState({
		pass: false,
		conf: false,
	})
	document.title = 'Safar - Join Now'
	const isLogin = useSelector(state => !!state.auth.user)
	const theme = useTheme()
	const navigate = useNavigate()
	const matchMdUp = useMediaQuery(theme.breakpoints.up('md'))
	const matchSmUp = useMediaQuery(theme.breakpoints.up('sm'))
	const match375Up = useMediaQuery('(min-width: 375px)')
	const dispatch = useDispatch()
	const formik = useFormik({
		initialValues: {
			username: '',
			name: '',
			email: '',
			password: '',
			confirm_password: ''
		},
		validationSchema: signUpValidation,
		onSubmit: values => {
			dispatch(signup(values))
		},
	})

	const handleClickShowPassword = key => {
		setShowPassword(prevState => {
			return { ...prevState, [key]: !prevState[key] }
		})
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
					minHeight: match375Up ? 600 : 500,
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
						Create new account
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
							label='Username'
							name='username'
							onChange={formik.handleChange}
							value={formik.values.username}
							error={!!(formik.touched.username && formik.errors.username)}
							helperText={formik.touched.username && formik.errors.username}
							onBlur={formik.handleBlur}
						/>
						<TextField
							size='small'
							sx={textfieldSx}
							label='Name'
							name='name'
							onChange={formik.handleChange}
							value={formik.values.name}
							error={!!(formik.touched.name && formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
							onBlur={formik.handleBlur}
						/>
						<TextField
							size='small'
							sx={textfieldSx}
							label='Email'
							name='email'
							type='email'
							onChange={formik.handleChange}
							value={formik.values.email}
							error={!!(formik.touched.email && formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
							onBlur={formik.handleBlur}
						/>
						<TextField
							size='small'
							sx={textfieldSx}
							label='Password'
							name='password'
							type={showPassword.pass ? 'text' : 'password'}
							onChange={formik.handleChange}
							value={formik.values.password}
							error={!!(formik.touched.password && formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
							onBlur={formik.handleBlur}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={() => handleClickShowPassword('pass')}
											edge='end'
										>
											{showPassword.pass ? (
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
							type='submit'
							sx={{
								display: 'block',
								margin: '1rem auto',
							}}
							variant='contained'
							// onClick={() => navigate('/')}
						>
							Sign Up
						</Button>
						<Typography
							sx={{
								textAlign: 'center',
								color: theme.palette.text.secondary,
							}}
							component='p'
							variant='caption'
						>
							Have an account?{' '}
							<Typography
								sx={{
									color: theme.palette.primary.main,
									cursor: 'pointer',
									fontWeight: '500',
								}}
								component='a'
								variant='caption'
								onClick={() => {
									navigate('/accounts/login')
								}}
							>
								Log In
							</Typography>
						</Typography>
					</form>
				</Box>
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
			</Paper>
		</Box>
	)
}

export default SignUpPage
