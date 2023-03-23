import { AddAPhotoOutlined, ArrowBack } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	IconButton,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import { useFormik } from 'formik'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CropperModal from '../components/CropperModal'
import { editUser } from '../redux/features/auth-slice'
import editProfileValidation from '../validations/editProfileValidation'

function EditProfilePage() {
	const user = useSelector(state => state.auth.user)
	const navigate = useNavigate()
	const theme = useTheme()
	const dispatch = useDispatch()

	document.title = 'Safar - Edit Profile'

	const [bannerImage, setBannerImage] = useState(null)
	const [openBannerCropper, setOpenBannerCropper] = useState(false)
	const [croppedBannerImage, setCroppedBannerImage] = useState(null)

	const [profileImage, setProfileImage] = useState(null)
	const [openProfileCropper, setOpenProfileCropper] = useState(false)
	const [croppedProfileImage, setCroppedProfileImage] = useState(null)

	const formik = useFormik({
		initialValues: {
			username: user.username,
			name: user.name,
			email: user.email,
			bio: user.bio,
		},
		validationSchema: editProfileValidation,
		onSubmit: async (values, action) => {
			const formData = new FormData()

			if (croppedProfileImage) {
				const file = new File([croppedProfileImage.blob], 'profile.jpeg', {
					type: croppedProfileImage.blob.type,
				})

				formData.append('avatar', file)
			}

			if (croppedBannerImage) {
				const file = new File([croppedBannerImage.blob], 'banner.jpeg', {
					type: croppedBannerImage.blob.type,
				})

				formData.append('banner', file)
			}

			for (let key in values) {
				formData.append(key, values[key])
			}

			dispatch(
				editUser({
					pLoad: formData,
					userId: user._id,
				})
			)
		},
	})

	const handleBannerImageChange = e => {
		setBannerImage(URL.createObjectURL(e.target.files[0]))
		setOpenBannerCropper(true)
		e.target.value = ''
	}

	const handleProfileImageChange = e => {
		setProfileImage(URL.createObjectURL(e.target.files[0]))
		setOpenProfileCropper(true)
		e.target.value = ''
	}

	const inputStyle = {
		width: '100%',
		marginBottom: 2,
	}

	return (
		<Box
			sx={{
				padding: 2,
				background: theme.palette.background.paper,
				borderRadius: 1,
				marginBottom: 12,
			}}
		>
			<CropperModal
				open={openBannerCropper}
				handleClose={() => setOpenBannerCropper(false)}
				image={bannerImage}
				aspectRatio={3 / 1}
				setCroppedImage={setCroppedBannerImage}
			/>
			<CropperModal
				open={openProfileCropper}
				handleClose={() => setOpenProfileCropper(false)}
				image={profileImage}
				aspectRatio={1 / 1}
				setCroppedImage={setCroppedProfileImage}
				cropShape='round'
			/>
			<ArrowBack
				onClick={() => navigate(-1)}
				sx={{ marginBottom: 1, cursor: 'pointer' }}
			/>
			<Typography
				component='h6'
				variant='body1'
				sx={{ fontWeight: 500, marginBottom: '0.5rem' }}
			>
				Edit Profile
			</Typography>
			<form onSubmit={formik.handleSubmit}>
				<Box
					sx={{
						position: 'relative',
						borderRadius: theme.spacing(1.4, 1.4, 0, 0),
						overflow: 'hidden',
					}}
				>
					<Box
						sx={{
							paddingBottom: '33.3333%',
						}}
					/>
					<Box
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
							width: '100%',
							height: '100%',
							zIndex: 0,
						}}
					>
						<Box
							sx={{
								backgroundImage: `url(${
									croppedBannerImage?.url || user.banner.image
								})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center center',
								height: '100%',
								width: '100%',
							}}
						/>
					</Box>

					<IconButton
						component='label'
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							zIndex: 1,
							background: 'rgba(0, 0, 0, 0.5)',
							'&:hover': {
								background: 'rgba(0, 0, 0, 0.5)',
							},
						}}
					>
						<AddAPhotoOutlined sx={{ color: theme.palette.grey[300] }} />
						<input
							type='file'
							accept='image/*'
							hidden
							onChange={handleBannerImageChange}
						/>
					</IconButton>
				</Box>

				<Box
					sx={{
						padding: theme.spacing(1, 2, 0, 2),
						marginBottom: 2,
					}}
				>
					<Box
						sx={{
							width: '25%',
							minWidth: 85,
							aspectRatio: '1 / 1',
							marginTop: '-15%',
							position: 'relative',
						}}
					>
						<Avatar
							src={croppedProfileImage?.url || user.avatar.image}
							sx={{
								width: '100%',
								height: '100%',
								border: `5px solid ${theme.palette.background.paper}`,
							}}
						/>
						<IconButton
							component='label'
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								zIndex: 1,
								background: 'rgba(0, 0, 0, 0.5)',
								'&:hover': {
									background: 'rgba(0, 0, 0, 0.5)',
								},
							}}
						>
							<AddAPhotoOutlined sx={{ color: theme.palette.grey[300] }} />
							<input
								type='file'
								accept='image/*'
								hidden
								onChange={handleProfileImageChange}
							/>
						</IconButton>
					</Box>
				</Box>

				<TextField
					size='small'
					label='Username'
					sx={inputStyle}
					name='username'
					value={formik.values.username}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={!!(formik.touched.username && formik.errors.username)}
					helperText={formik.touched.username && formik.errors.username}
				/>
				<TextField
					size='small'
					label='Name'
					sx={inputStyle}
					name='name'
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={!!(formik.touched.name && formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
				/>
				<TextField
					size='small'
					label='Email'
					sx={inputStyle}
					name='email'
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={!!(formik.touched.email && formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<TextField
					size='small'
					label='Bio'
					multiline
					rows={3}
					sx={inputStyle}
					name='bio'
					value={formik.values.bio}
					onChange={formik.handleChange}
				/>

				<Button type='submit' variant='contained'>
					Save
				</Button>
			</form>
		</Box>
	)
}

export default EditProfilePage
