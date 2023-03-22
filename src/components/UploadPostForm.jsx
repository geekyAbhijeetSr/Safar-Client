import {
	Box,
	IconButton,
	Slider,
	Stack,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import Cropper from 'react-easy-crop'
import React, { useCallback, useState } from 'react'
import { ZoomIn, ZoomOut } from '@mui/icons-material'
import getCroppedImg from '../helper/cropImage'
import { useFormik } from 'formik'
import postFormValidation from '../validations/postFormValidation'
import { useDispatch } from 'react-redux'
import { createPost } from '../redux/features/post-slice'

function UploadPostForm(props) {
	const { image, handleClose } = props
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [aspectRatio, setAspectRatio] = useState(1 / 1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
	const [croppedImage, setCroppedImage] = useState()
	const [step, setStep] = useState(1)
	const theme = useTheme()
	const dispatch = useDispatch()
	const formik = useFormik({
		initialValues: {
			location: '',
			caption: '',
		},
		validationSchema: postFormValidation,
		onSubmit: (values, action) => {
			const file = new File([croppedImage.blob], 'post-image.jpeg', {
				type: croppedImage.blob.type,
			})

			const formData = new FormData()
			formData.append('postimage', file)
			formData.append('location', values.location)
			formData.append('caption', values.caption)

			dispatch(createPost(formData))
			
			action.resetForm({
				location: '',
				caption: '',
			})
			handleClose()
		},
	})

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels)
	}, [])

	const showCroppedImage = async () => {
		try {
			const croppedImage = await getCroppedImg(image, croppedAreaPixels)
			setCroppedImage(croppedImage)
			setStep(2)
		} catch (e) {
			console.error(e)
		}
	}

	const nextStep = () => {
		if (step === 1) {
			showCroppedImage()
		}

		if (step < 3) {
			setStep(prevStep => prevStep + 1)
		}
	}

	const prevStep = () => {
		if (step === 1) {
			handleClose()
		}

		if (step > 1) {
			setStep(prevStep => prevStep - 1)
		}
	}

	return (
		<Box
			sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: '90%',
				maxWidth: 600,
				bgcolor: 'background.paper',
				borderRadius: 1,
				p: 2,
				zIndex: 9999,
			}}
		>
			<form onSubmit={formik.handleSubmit}>
				<Stack
					direction='row'
					justifyContent='space-between'
					mb={1}
					sx={{
						position: 'relative',
					}}
				>
					<Typography
						color={step === 1 ? 'error' : 'primary'}
						sx={{
							cursor: 'pointer',
						}}
						onClick={prevStep}
					>
						{step > 1 ? 'Back' : 'Cancel'}
					</Typography>
					<Typography
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
						}}
					>
						{step === 1 && 'Crop'}
						{step === 2 && 'Preview Image'}
						{step === 3 && 'Create Post'}
					</Typography>
					<Typography
						onClick={nextStep}
						color='primary'
						sx={{
							cursor: 'pointer',
						}}
					>
						{step < 3 ? (
							'Next'
						) : (
							<button
								style={{
									background: 'none',
									border: 'none',
									cursor: 'pointer',
									padding: 0,
								}}
								type='submit'
							>
								<Typography color='primary'>Share</Typography>
							</button>
						)}
					</Typography>
				</Stack>

				<Box
					sx={{
						display: step === 1 ? 'block' : 'none',
					}}
				>
					<Box
						sx={{
							position: 'relative',
							width: '100%',
							aspectRatio: '3/2',
							background: '#333',
						}}
					>
						<Cropper
							image={image}
							crop={crop}
							zoom={zoom}
							aspect={aspectRatio}
							onCropChange={setCrop}
							onCropComplete={onCropComplete}
							onZoomChange={setZoom}
						/>
					</Box>

					<Stack direction='row' spacing={3} justifyContent='center' mt={1}>
						<Stack
							direction='row'
							alignItems='center'
							spacing={1}
							sx={{
								cursor: 'pointer',
							}}
							onClick={() => setAspectRatio(1 / 1)}
						>
							<Box
								sx={{
									width: '1rem',
									aspectRatio: '1 / 1',
									border: `1px solid ${theme.palette.text.primary}`,
									background:
										aspectRatio === 1 / 1 ? theme.palette.text.primary : '',
									borderRadius: 0.2,
								}}
							></Box>
							<Typography>1:1</Typography>
						</Stack>
						<Stack
							direction='row'
							alignItems='center'
							spacing={1}
							sx={{
								cursor: 'pointer',
							}}
							onClick={() => setAspectRatio(4 / 5)}
						>
							<Box
								sx={{
									width: '1rem',
									aspectRatio: '4 / 5',
									border: `1px solid ${theme.palette.text.primary}`,
									background:
										aspectRatio === 4 / 5 ? theme.palette.text.primary : '',
									borderRadius: 0.2,
								}}
							></Box>
							<Typography>4:5</Typography>
						</Stack>

						<Stack
							direction='row'
							alignItems='center'
							spacing={1}
							sx={{
								cursor: 'pointer',
							}}
							onClick={() => setAspectRatio(16 / 9)}
						>
							<Box
								sx={{
									width: '1.5rem',
									aspectRatio: '16/9',
									border: `1px solid ${theme.palette.text.primary}`,
									background:
										aspectRatio === 16 / 9 ? theme.palette.text.primary : '',
									borderRadius: 0.2,
								}}
							></Box>
							<Typography>16:9</Typography>
						</Stack>
					</Stack>

					<Stack justifyContent='center' spacing={2} sx={{ marginTop: 1 }}>
						<Stack
							direction='row'
							alignItems='center'
							spacing={2}
							sx={{ width: '100%' }}
						>
							<IconButton
								onClick={() =>
									setZoom(prev => {
										if (prev === 1) return 1
										return prev - 0.1
									})
								}
								color='primary'
							>
								<ZoomOut />
							</IconButton>
							<Slider
								size='small'
								value={zoom}
								min={1}
								max={3}
								step={0.1}
								aria-labelledby='Zoom'
								onChange={(e, zoom) => setZoom(zoom)}
							/>
							<IconButton
								onClick={() =>
									setZoom(prev => {
										if (prev === 3) return 3
										return prev + 0.1
									})
								}
								color='primary'
							>
								<ZoomIn />
							</IconButton>
						</Stack>
					</Stack>
				</Box>

				<Box
					sx={{
						display: step === 2 ? 'block' : 'none',
						width: '100%',
					}}
				>
					{croppedImage ? (
						<img
							src={croppedImage.url}
							alt=''
							style={{
								width: '100%',
							}}
						/>
					) : (
						<Box
							sx={{
								width: '100%',
								aspectRatio: '1/1',
							}}
						/>
					)}
				</Box>

				<Box
					sx={{
						display: step === 3 ? 'block' : 'none',
					}}
				>
					<Stack direction='column' spacing={2} mt={2} mb={2}>
						<TextField
							size='small'
							label='Location'
							name='location'
							value={formik.values.location}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={!!(formik.touched.location && formik.errors.location)}
							helperText={formik.touched.location && formik.errors.location}
						/>
						<TextField
							size='small'
							label='Caption'
							multiline
							rows={3}
							name='caption'
							value={formik.values.caption}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={!!(formik.touched.caption && formik.errors.caption)}
							helperText={formik.touched.caption && formik.errors.caption}
						/>
					</Stack>

					<Box
						sx={{
							width: '100%',
							aspectRatio: '1/1',
							backgroundImage: `url(${croppedImage?.url})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center center',
							borderRadius: 1,
						}}
					/>
				</Box>
			</form>
		</Box>
	)
}

export default UploadPostForm
