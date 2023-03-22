import { ArrowBack } from '@mui/icons-material'
import {
	Box,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
	useTheme,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeTheme } from '../redux/features/theme-slice'

function ChangeThemePage() {
	const navigate = useNavigate()
	const theme = useTheme()
	const selectedTheme = useSelector(state => state.theme)
	const dispatch = useDispatch()

	const handleChange = event => {
		dispatch(changeTheme(event.target.value))
	}

	return (
		<Box
			sx={{
				padding: 2,
				background: theme.palette.background.paper,
				borderRadius: 1,
			}}
		>
			<ArrowBack
				onClick={() => navigate(-1)}
				sx={{ marginBottom: 1, cursor: 'pointer' }}
			/>
			<FormControl
				sx={{
					display: 'block',
				}}
			>
				<Typography
					component='h6'
					variant='body1'
					sx={{
						fontWeight: 500,
					}}
				>
					Change Theme
				</Typography>
				<RadioGroup
					aria-labelledby='demo-controlled-radio-buttons-group'
					name='controlled-radio-buttons-group'
					value={selectedTheme}
					onChange={handleChange}
				>
					<FormControlLabel value='light' control={<Radio />} label='Light' />
					<FormControlLabel value='dark' control={<Radio />} label='Dark' />
				</RadioGroup>
			</FormControl>
		</Box>
	)
}

export default ChangeThemePage
