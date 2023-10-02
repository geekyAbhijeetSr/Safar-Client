import {
	ArrowBack,
	VisibilityOffOutlined,
	VisibilityOutlined,
} from '@mui/icons-material'
import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import { useFormik } from 'formik'

import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import changePasswordValidation from '../validations/changePasswordValidation'
import { useSelector } from 'react-redux'

function ChangePasswordPage() {
	const navigate = useNavigate()
	const user = useSelector(state => state.auth.user)
	const theme = useTheme()
	const [showPassword, setShowPassword] = useState({
		old: false,
		new: false,
		conf: false,
	})

	document.title = 'Safar - Change Password'

	const formik = useFormik({
		initialValues: {
			old_password: '',
			new_password: '',
			confirm_password: '',
		},
		validationSchema: changePasswordValidation,
		onSubmit: (values, action) => {
			;(async () => {
				if (user.username === 'johndoe') {
					toast.error('This action is not allowed in demo')
					return
				}
				const request = () => {
					return fetch(
						`${process.env.REACT_APP_API_URL}/auth/change-password`,
						{
							credentials: 'include',
							method: 'PUT',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(values),
						}
					).then(res => res.json())
				}

				await toast.promise(request(), {
					loading: 'Saving...',
					success: res => {
						if (!res.ok) throw new Error(res.errorMsg)
						action.resetForm()
						return 'Password changed successfully!'
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
	const inputStyle = {
		width: '100%',
		marginBottom: 2,
		maxWidth: 400,
	}

	return (
		<Box
			sx={{
				padding: 2,
				background: theme.palette.background.paper,
				borderRadius: 1,
			}}
		>
			<ArrowBack
				onClick={() => navigate(-1)}
				sx={{ marginBottom: 1, cursor: 'pointer' }}
			/>
			<Typography
				component='h6'
				variant='body1'
				sx={{ fontWeight: 500, marginBottom: '0.75rem' }}
			>
				Change Password
			</Typography>

			<form onSubmit={formik.handleSubmit}>
				<TextField
					sx={inputStyle}
					label='Old Password'
					size='small'
					type={showPassword.old ? 'text' : 'password'}
					name='old_password'
					onChange={formik.handleChange}
					value={formik.values.old_password}
					onBlur={formik.handleBlur}
					error={!!(formik.touched.old_password && formik.errors.old_password)}
					helperText={formik.touched.old_password && formik.errors.old_password}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									onClick={() => handleClickShowPassword('old')}
									edge='end'
								>
									{showPassword.old ? (
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
					sx={inputStyle}
					label='New Password'
					size='small'
					type={showPassword.new ? 'text' : 'password'}
					name='new_password'
					onChange={formik.handleChange}
					value={formik.values.new_password}
					onBlur={formik.handleBlur}
					error={!!(formik.touched.new_password && formik.errors.new_password)}
					helperText={formik.touched.new_password && formik.errors.new_password}
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
					sx={inputStyle}
					label='Confirm Password'
					size='small'
					type={showPassword.conf ? 'text' : 'password'}
					name='confirm_password'
					onChange={formik.handleChange}
					value={formik.values.confirm_password}
					onBlur={formik.handleBlur}
					error={
						!!(
							formik.touched.confirm_password && formik.errors.confirm_password
						)
					}
					helperText={
						formik.touched.confirm_password && formik.errors.confirm_password
					}
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
					variant='contained'
					sx={{
						display: 'block',
					}}
				>
					Save
				</Button>
			</form>
		</Box>
	)
}

export default ChangePasswordPage
