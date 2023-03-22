import {
	AppBar,
	Avatar,
	Button,
	Container,
	IconButton,
	Stack,
	Typography,
	useMediaQuery,
	Menu,
	MenuItem,
	ListItemIcon,
	Divider,
	useTheme,
	Box,
} from '@mui/material'
import {
	LogoutOutlined,
	SettingsOutlined,
	Add,
	Search as SearchIcon,
	Route,
} from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UploadPostModal from './UploadPostModal'
import HideOnScroll from './HideOnScroll'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/features/auth-slice'
import { resetPostState } from '../redux/features/post-slice'
import { debounce } from '../helper/utils'
import {
	getNewSearchResult,
	resetSearchResultState,
	setSearchQuery,
} from '../redux/features/search-result-slice'

function Navbar() {
	const [postImage, setPostImage] = useState(null)
	const [openUploadPostModal, setOpenUploadPostModal] = useState(false)
	const theme = useTheme()
	const matchSmUp = useMediaQuery(theme.breakpoints.up('sm'))
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const inputRef = useRef()
	const count = useRef(0)
	const { user } = useSelector(state => state.auth)

	// menu handler
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	// menu handler end

	const onLogout = () => {
		dispatch(logout())
		dispatch(resetPostState())
	}

	const handlePostImageChange = e => {
		setPostImage(URL.createObjectURL(e.target.files[0]))
		setOpenUploadPostModal(true)
		e.target.value = ''
	}

	const getUsers = debounce(value => {
		const queryParams = new URLSearchParams(location.search)
		const searchQuery = queryParams.get('q')
		const query = encodeURIComponent(value)

		if (searchQuery !== query) {
			navigate(`/result?q=${query}`)
			count.current++
		}

		if (!value && location.pathname === '/result') {
			navigate(-1 * count.current)
			count.current = 0
		}

		dispatch(resetSearchResultState())
		dispatch(setSearchQuery(value))
		dispatch(
			getNewSearchResult({
				search_query: value,
			})
		)
	})

	const searchQuery = e => {
		getUsers(e.target.value)
	}

	useEffect(() => {
		if (location.pathname !== '/result') {
			inputRef.current.value = ''
		} else {
			if (inputRef.current.value) return
			const queryParams = new URLSearchParams(location.search)
			const searchQuery = queryParams.get('q')
			inputRef.current.value = searchQuery
			getUsers(searchQuery)
		}
	}, [location.pathname, getUsers, location.search])

	return (
		<>
			<UploadPostModal
				open={openUploadPostModal}
				handleClose={() => setOpenUploadPostModal(false)}
				image={postImage}
			/>

			<HideOnScroll>
				<AppBar
					sx={{
						height: '55px',
						background: theme.palette.background.paper,
						position: 'sticky',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.05))',
					}}
				>
					<Container maxWidth='md'>
						<Stack
							direction='row'
							justifyContent='space-between'
							alignItems='center'
							spacing={matchSmUp ? 2 : 1}
							sx={{
								height: '55px',
							}}
						>
							{matchSmUp ? (
								<Typography
									className='logo-font'
									sx={{
										color: theme.palette.primary.main,
										marginRight: 1,
										cursor: 'pointer',
									}}
									component='h4'
									variant='h4'
									onClick={() => navigate('/')}
								>
									Safar
								</Typography>
							) : (
								<Route
									sx={{
										color: theme.palette.primary.main,
										fontSize: 40,
										transform: 'rotate(90deg)',
										cursor: 'pointer',
									}}
									onClick={() => navigate('/')}
								/>
							)}

							<Box
								sx={{
									position: 'relative',
									width: '100%',
									maxWidth: '300px',
									height: '35px',
									margin: '0 50px',
									backgroundColor: theme.palette.background.default,
									borderRadius: '6px',
								}}
							>
								<input
									style={{
										position: 'relative',
										width: '100%',
										height: '100%',
										fontSize: '16px',
										fontWeight: 400,
										color: theme.palette.text.secondary,
										padding: '0 15px 0 50px',
										border: 'none',
										borderRadius: '6px',
										outline: 'none',
										background: 'transparent',
									}}
									type='text'
									placeholder='Search...'
									ref={inputRef}
									onChange={searchQuery}
								/>
								<Box
									component='span'
									sx={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '50px',
										height: '100%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: 'transparent',
										borderRadius: '6px 0 0 6px',
										cursor: 'pointer',
									}}
								>
									<SearchIcon
										sx={{
											color: theme.palette.text.primary,
										}}
									/>
								</Box>
							</Box>

							<Stack
								direction='row'
								alignItems='center'
								spacing={matchSmUp ? 2 : 1}
								sx={{
									height: '55px',
								}}
							>
								{matchSmUp ? (
									<Button
										component='label'
										variant='outlined'
										startIcon={<Add />}
									>
										Upload
										<input
											type='file'
											accept='image/*'
											hidden
											onChange={handlePostImageChange}
										/>
									</Button>
								) : (
									<IconButton
										component='label'
										variant='outlined'
										color='primary'
									>
										<Add />
										<input
											type='file'
											accept='image/*'
											hidden
											onChange={handlePostImageChange}
										/>
									</IconButton>
								)}

								<IconButton
									onClick={handleClick}
									size='small'
									aria-controls={open ? 'account-menu' : undefined}
									aria-haspopup='true'
									aria-expanded={open ? 'true' : undefined}
								>
									<Avatar
										alt={user.name}
										src={user.avatar.image}
										sx={{ width: 36, height: 36 }}
									/>
								</IconButton>

								<Menu
									anchorEl={anchorEl}
									id='account-menu'
									open={open}
									onClose={handleClose}
									onClick={handleClose}
									PaperProps={{
										elevation: 0,
										sx: {
											overflow: 'hidden',
											width: 200,
											filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
											mt: 1.5,
											'& .MuiAvatar-root': {
												width: 32,
												height: 32,
												ml: -0.5,
												mr: 1,
											},
											'& .MuiMenuItem-root': {
												'&, & .MuiListItemIcon-root': {
													color: theme.palette.text.secondary,
												},
											},
											'& .MuiMenuItem-root:hover': {
												bgcolor: 'transparent',
												textDecoration: 'underline',
											},
										},
									}}
									transformOrigin={{ horizontal: 'right', vertical: 'top' }}
									anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
									disableScrollLock={true}
								>
									<MenuItem
										onClick={() => {
											if (location.pathname === `/${user.username}`) {
												window.scrollTo({
													top: 0,
													behavior: 'smooth',
												})
											} else navigate(`/${user.username}`)
										}}
									>
										<Avatar alt={user.name} src={user.avatar.image} />
										{user.username}
									</MenuItem>
									<Divider />
									<MenuItem onClick={() => navigate('/settings')}>
										<ListItemIcon>
											<SettingsOutlined />
										</ListItemIcon>
										Settings
									</MenuItem>
									<MenuItem onClick={onLogout}>
										<ListItemIcon>
											<LogoutOutlined />
										</ListItemIcon>
										Logout
									</MenuItem>
								</Menu>
							</Stack>
						</Stack>
					</Container>
				</AppBar>
			</HideOnScroll>
		</>
	)
}

export default Navbar
