import { Card, CardMedia, Modal } from '@mui/material'

function BannerPicModal(props) {
	const { open, handleClose, bannerPic } = props

	return (
		<Modal open={open} onClose={handleClose}>
			<Card
				sx={{
					position: 'absolute',
					top: '35%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '95%',
					maxWidth: 900,
					bgcolor: 'background.paper',
					borderRadius: 1,
					padding: 1,
				}}
			>
				<CardMedia
					component='img'
					height='auto'
					image={bannerPic}
					sx={{
						width: '100%',
						overflow: 'hidden',
						borderRadius: 1,
					}}
				/>
			</Card>
		</Modal>
	)
}

export default BannerPicModal
