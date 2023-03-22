import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	Bookmarks,
	BookmarksOutlined,
	Hub,
	HubOutlined,
	PeopleAlt,
	PeopleAltOutlined,
} from '@mui/icons-material'
import HideOnScroll from './HideOnScroll'

function BottomNavbar() {
	const [value, setValue] = React.useState(0)
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (
			location.pathname !== '/' ||
			location.pathname !== '/following' ||
			location.pathname !== '/saved'
		)
			setValue(-1)
		if (location.pathname === '/') setValue(0)
		if (location.pathname === '/following') setValue(1)
		if (location.pathname === '/saved') setValue(2)
	}, [location])

	return (
		<HideOnScroll direction='up'>
			<Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
				<BottomNavigation
					showLabels
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue)
					}}
				>
					<BottomNavigationAction
						label='Global'
						icon={value === 0 ? <Hub /> : <HubOutlined />}
						onClick={() => {
							navigate('/')
						}}
					/>
					<BottomNavigationAction
						label='Following'
						icon={value === 1 ? <PeopleAlt /> : <PeopleAltOutlined />}
						onClick={() => {
							navigate('/following')
						}}
					/>
					<BottomNavigationAction
						label='Saved'
						icon={value === 2 ? <Bookmarks /> : <BookmarksOutlined />}
						onClick={() => {
							navigate('/saved')
						}}
					/>
				</BottomNavigation>
			</Box>
		</HideOnScroll>
	)
}

export default BottomNavbar
