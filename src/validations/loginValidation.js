import * as Yup from 'yup'

const logInValidation = Yup.object({
	username_or_email: Yup.string().required('Username or email is required'),
	password: Yup.string().required('Password is required'),
})

export default logInValidation
