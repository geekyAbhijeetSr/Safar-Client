import {
	Box,
	Modal,
	useTheme,
} from '@mui/material'
import EditPostForm from './EditPostForm'

function EditPostModal(props) {
	const { open, handleClose, postId, caption, location } = props
	const theme = useTheme()

	return (
		<Modal open={open} onClose={handleClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '90%',
					maxWidth: 400,
					bgcolor: 'background.paper',
					borderRadius: 1,
					padding: theme.spacing(3, 2, 2, 2),
				}}
			>
				<EditPostForm
					postId={postId}
					caption={caption}
					location={location}
					handleClose={handleClose}
				/>
			</Box>
		</Modal>
	)
}

export default EditPostModal
