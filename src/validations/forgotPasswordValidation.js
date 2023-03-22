import * as Yup from 'yup'

const forgotPasswordValidation = Yup.object({
	email: Yup.string()
		.email('Must be a valid email address')
		.required('Email is required'),
})

export default forgotPasswordValidation
