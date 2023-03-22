import React from 'react'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'

const ThemeHandler = props => {
	const selectedTheme = useSelector(state => state.theme)
	
	let theme = createTheme({
		palette: {
			mode: selectedTheme,
			primary: {
				main: selectedTheme === 'light' ? '#0071d8' : '#66b5ff',
			},
			secondary: {
				main: selectedTheme === 'light' ? '#0C1739' : '#fff',
			},
			background: {
				default: selectedTheme === 'light' ? '#eef0f4' : '#000b14',
				paper: selectedTheme === 'light' ? '#fff' : '#001529',
			},
		},
		shape: {
			borderRadius: 16,
		},
		shadows: Array(25).fill('none'),
		typography: {
			button: {
				textTransform: 'none',
			},
		},
		components: {
			MuiButtonBase: {
				defaultProps: {
					disableRipple: true,
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						minWidth: '100px',
					},
				},
			},
		},
	})
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{props.children}
		</ThemeProvider>
	)
}

export default ThemeHandler
