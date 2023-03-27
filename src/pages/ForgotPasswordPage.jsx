import {
	Box,
	Button,
	Paper,
	TextField,
	Typography,
	useTheme,
	useMediaQuery,
} from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Player } from '@lottiefiles/react-lottie-player'
import forgotPasswordValidation from '../validations/forgotPasswordValidation'
import { toast } from 'react-hot-toast'

function ForgotPasswordPage() {
	const theme = useTheme()
	const [successMsg, setSuccessMsg] = useState()
	const matchMdUp = useMediaQuery(theme.breakpoints.up('md'))
	const matchSmUp = useMediaQuery(theme.breakpoints.up('sm'))
	const match375Up = useMediaQuery('(min-width: 375px)')
	document.title = 'Safar - Forgot Password'
	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: forgotPasswordValidation,
		onSubmit: (values, action) => {
			;(async () => {
				const request = () => {
					return fetch(
						`${process.env.REACT_APP_API_URL}/auth/forgot-password`,
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
					loading: 'Sending...',
					success: res => {
						if (!res.ok) throw new Error(res.errorMsg)
						setSuccessMsg(
							'Please check your email, the password reset link has been sent to your email address.'
						)
						action.resetForm()
						return 'Please check you email!'
					},
					error: err => {
						setSuccessMsg(null)
						return err.toString().split(': ')[1]
					},
				})
			})()
		},
	})

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
							src='https://assets8.lottiefiles.com/private_files/lf30_GjhcdO.json'
							style={{ width: '95%', marginTop: '5rem' }}
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
						Forgot Password?
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
						Enter the email address linked to your account to reset your
						password.
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
							label='Email'
							type='text'
							name='email'
							onChange={formik.handleChange}
							value={formik.values.email}
							error={!!(formik.touched.email && formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
							onBlur={formik.handleBlur}
						/>

						<Button
							sx={{
								display: 'block',
							}}
							variant='contained'
							type='submit'
						>
							Submit
						</Button>

						{successMsg && (
							<Typography
								variant='body1'
								sx={{
									color: theme.palette.success.main,
									marginTop: '1rem',
								}}
							>
								{successMsg}
							</Typography>
						)}
					</form>
				</Box>
			</Paper>
		</Box>
	)
}

export default ForgotPasswordPage
