import { Box, Container, Stack, useMediaQuery } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import BottomNavbar from '../components/BottomNavbar'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function Layout() {
	const matchSmUp = useMediaQuery(theme => theme.breakpoints.up('sm'))
	const { pathname } = useLocation()
	const user = useSelector(state => !!state.auth.user)

	if (!user && pathname === '/') {
		return <Outlet />
	}

	return (
		<>
			<Navbar />
			<Container
				sx={{
					marginTop: 2,
				}}
				maxWidth='md'
			>
				<Stack
					direction='row'
					sx={{
						gap: 2,
						alignItems: 'flex-start',
					}}
				>
					{matchSmUp && <Sidebar />}
					<Box
						sx={{
							flex: 2,
						}}
					>
						<Outlet />
					</Box>
				</Stack>
			</Container>
			{!matchSmUp && <BottomNavbar />}
		</>
	)
}

export default Layout
