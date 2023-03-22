import * as Yup from 'yup'

const postFormValidation = Yup.object({
	location: Yup.string()
		.max(25, 'Must be at most 25 characters')
		.required('Location is required'),
	caption: Yup.string().max(150, 'Must be at most 150 characters'),
})

export default postFormValidation
