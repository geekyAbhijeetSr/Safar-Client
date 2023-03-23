import { ArrowForwardIos, DarkModeOutlined, PasswordOutlined, Person2Outlined } from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function SettingsPage() {
	const theme = useTheme()
	const navigate = useNavigate()

	document.title = 'Safar - Settings'
	
	return (
		<Box
			sx={{
				padding: 2,
				background: theme.palette.background.paper,
				borderRadius: 1,
			}}
		>
			<Typography component='h6' variant='h6' mb={1}>
				Settings
			</Typography>

			<List
				sx={{
					'& .MuiListItem-root': {
						'&, & .MuiListItemIcon-root': {
							color: theme.palette.text.secondary,
						},
					},
				}}
			>
				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate('/settings/editprofile')}>
						<ListItemIcon>
							<Person2Outlined />
						</ListItemIcon>
						<ListItemText primary='Edit profile' />
						<ListItemIcon>
							<ArrowForwardIos />
						</ListItemIcon>
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate('/settings/changepassword')}>
						<ListItemIcon>
							<PasswordOutlined />
						</ListItemIcon>
						<ListItemText primary='Change password' />
						<ListItemIcon>
							<ArrowForwardIos />
						</ListItemIcon>
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton onClick={() => navigate('/settings/changetheme')}>
						<ListItemIcon>
							<DarkModeOutlined />
						</ListItemIcon>
						<ListItemText primary='Change theme' />
						<ListItemIcon>
							<ArrowForwardIos />
						</ListItemIcon>
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	)
}

export default SettingsPage
