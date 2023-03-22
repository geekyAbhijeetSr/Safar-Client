import * as Yup from 'yup'

const changePasswordValidation = Yup.object({
	old_password: Yup.string().required('Old password is required'),
	new_password: Yup.string().min(8, 'Must be at least 8 characters').required('New password is required'),
	confirm_password: Yup.string()
		.required('Confirm password is required')
		.oneOf([Yup.ref('new_password'), null], 'Password must match'),
})

export default changePasswordValidation
