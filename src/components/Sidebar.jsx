import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme,
} from '@mui/material'
import React from 'react'
import {
	Hub,
	HubOutlined,
	PeopleAlt,
	PeopleAltOutlined,
	Bookmarks,
	BookmarksOutlined,
} from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
	const theme = useTheme()
	const location = useLocation()

	const sidebarSx = {
		flex: 1,
		background: theme.palette.background.paper,
		position: 'sticky',
		top: `calc(55px + ${theme.spacing(2)})`,
		borderRadius: 1,
		overflow: 'hidden',
		filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.05))',
	}

	const sidebarListItem = [
		{
			to: '/',
			icon: <HubOutlined />,
			icon2: <Hub />,
			primary: 'Global',
		},
		{
			to: '/following',
			icon: <PeopleAltOutlined />,
			icon2: <PeopleAlt />,
			primary: 'Following',
		},
		{
			to: '/saved',
			icon: <BookmarksOutlined />,
			icon2: <Bookmarks />,
			primary: 'Saved',
		},
	]

	return (
		<Box sx={sidebarSx}>
			<List
				sx={{
					'& .MuiListItem-root': {
						'&, & .MuiListItemIcon-root': {
							color: theme.palette.text.secondary,
						},
					},
					'&& .Mui-selected, && .Mui-selected:hover': {
						bgcolor: 'transparent',
						'&, & .MuiListItemIcon-root': {
							color: `${theme.palette.primary.main} !important`,
						},
					},
					'& .MuiListItemButton-root:hover': {
						bgcolor: 'transparent',
						'&, & .MuiListItemIcon-root': {
							color: theme.palette.primary.main,
						},
					},
				}}
			>
				{sidebarListItem.map((item, index) => (
					<ListItem
						key={index}
						selected={location.pathname === item.to}
						disablePadding
					>
						<ListItemButton component={Link} to={item.to}>
							<ListItemIcon sx={{ paddingLeft: 1 }}>
								{location.pathname !== item.to ? item.icon : item.icon2}
							</ListItemIcon>
							<ListItemText primary={item.primary} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)
}

export default Sidebar
