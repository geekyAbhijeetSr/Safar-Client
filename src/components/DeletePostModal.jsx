import {
	Box,
	Button,
	Modal,
	Stack,
	Typography,
	useTheme,
} from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../redux/features/post-slice'

function DeletePostModal(props) {
	const { open, handleClose, postId } = props
	const dispatch = useDispatch()
	const theme = useTheme()

	const deleteHandler = () => {
		dispatch(deletePost(postId))
		handleClose()
	}
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
					p: theme.spacing(3, 2, 2, 2),
				}}
			>
				<Typography variant='h6' component='h2'>
					Delete post?
				</Typography>
				<Typography sx={{ mt: 1, color: theme.palette.text.secondary }}>
					Are you sure? This can't be undone.
				</Typography>
				<Stack
					direction='row'
					sx={{
						marginTop: 2,
						gap: 1,
						justifyContent: 'flex-end',
					}}
				>
					<Button variant='contained' color='error' onClick={deleteHandler}>
						Delete
					</Button>
					<Button onClick={handleClose} variant='outlined'>
						Cancel
					</Button>
				</Stack>
			</Box>
		</Modal>
	)
}

export default DeletePostModal
