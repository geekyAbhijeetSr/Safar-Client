import * as Yup from 'yup'

const editProfileValidation = Yup.object({
	username: Yup.string()
		.max(16, 'Must be at most 16 characters')
		.test(
			'is-not-email',
			'Username cannot be an email address',
			function (value) {
				// Check if value is an email address
				if (/^\S+@\S+\.\S+$/.test(value)) {
					return false
				}
				return true
			}
		)
		.required('Username is required'),
	name: Yup.string()
		.max(25, 'Must be at most 25 characters')
		.required('Name is required'),
	email: Yup.string()
		.email('Must be a valid email address')
		.required('Email is required'),
})

export default editProfileValidation
