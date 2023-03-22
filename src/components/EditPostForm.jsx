import {
	Button,
	Stack,
	TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { editPost } from '../redux/features/post-slice'
import postFormValidation from '../validations/postFormValidation'

function EditPostForm(props) {
	const { postId, caption, location, handleClose } = props
	const dispatch = useDispatch()
	const formik = useFormik({
		initialValues: {
			location,
			caption,
		},
		validationSchema: postFormValidation,
		onSubmit: (values, action) => {
			values.postId = postId
			dispatch(editPost(values))
			handleClose()
		},
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<TextField
				label='Location'
				size='small'
				name='location'
				value={formik.values.location}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={!!(formik.touched.location && formik.errors.location)}
				helperText={formik.touched.location && formik.errors.location}
				sx={{
					width: '100%',
					marginBottom: 2,
				}}
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
				sx={{
					width: '100%',
				}}
			/>

			<Stack
				direction='row'
				sx={{
					marginTop: 2,
					gap: 1,
					justifyContent: 'flex-end',
				}}
			>
				<Button type='submit' variant='contained'>
					Save
				</Button>
				<Button onClick={handleClose} variant='outlined'>
					Cancel
				</Button>
			</Stack>
		</form>
	)
}

export default EditPostForm
