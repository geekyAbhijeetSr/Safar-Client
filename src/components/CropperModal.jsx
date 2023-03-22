import {
	Box,
	IconButton,
	Modal,
	Slider,
	Stack,
	Typography,
} from '@mui/material'
import Cropper from 'react-easy-crop'
import React, { useCallback, useState } from 'react'
import { ZoomIn, ZoomOut } from '@mui/icons-material'
import getCroppedImg from '../helper/cropImage'

function CropperModal(props) {
	const { open, handleClose, image, aspectRatio, setCroppedImage, cropShape } = props
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels)
	}, [])

	const showCroppedImage = useCallback(async () => {
		try {
			const croppedImage = await getCroppedImg(image, croppedAreaPixels)
			setCroppedImage(croppedImage)
			setCrop({ x: 0, y: 0 })
			setZoom(1)
			setCroppedAreaPixels(null)
			handleClose()
		} catch (e) {
			console.error(e)
		}
	}, [image, setCroppedImage, croppedAreaPixels, handleClose])

	const onClose = useCallback(() => {
		setCroppedImage(null)
		setCrop({ x: 0, y: 0 })
		setZoom(1)
		setCroppedAreaPixels(null)
		handleClose()
	}, [setCroppedImage, handleClose])

	return (
		<Modal open={open} onClose={onClose}>
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
				}}
			>
				<Stack
					direction='row'
					justifyContent='space-between'
					mb={1}
					sx={{
						position: 'relative',
					}}
				>
					<Typography
						color='error'
						sx={{
							cursor: 'pointer',
						}}
						onClick={onClose}
					>
						Cancel
					</Typography>
					<Typography
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
						}}
					>
						Crop
					</Typography>
					<Typography
						onClick={showCroppedImage}
						color='primary'
						sx={{
							cursor: 'pointer',
						}}
					>
						Done
					</Typography>
				</Stack>
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
						cropShape={cropShape}
					/>
				</Box>

				<Stack justifyContent='center' spacing={2} sx={{ marginTop: 2 }}>
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
		</Modal>
	)
}

export default CropperModal
