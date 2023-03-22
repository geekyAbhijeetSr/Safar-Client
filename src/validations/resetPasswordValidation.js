import * as Yup from 'yup'

const resetPasswordValidation = Yup.object({
	new_password: Yup.string()
		.min(8, 'Must be at least 8 characters')
		.required('New password is required'),
	confirm_password: Yup.string()
		.required('Confirm password is required')
		.oneOf([Yup.ref('new_password'), null], 'Password must match'),
})

export default resetPasswordValidation
