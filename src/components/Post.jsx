import {
	alpha,
	Avatar,
	Box,
	Button,
	Card,
	CardMedia,
	ClickAwayListener,
	Grow,
	IconButton,
	ListItemIcon,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import {
	Bookmark,
	BookmarkBorder,
	DeleteOutlined,
	EditOutlined,
	Favorite,
	FavoriteBorder,
	FlagOutlined,
	MoreVert,
	PersonAddAlt1Outlined,
	PersonRemoveAlt1Outlined,
	PlaceOutlined,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import React, { forwardRef, useState } from 'react'
import relativeTime from '../helper/relativeTime'
import EditPostModal from './EditPostModal'
import DeletePostModal from './DeletePostModal'
import { useDispatch, useSelector } from 'react-redux'
import {
	followUser,
	toggleLikePost,
	toggleSavePost,
	unfollowUser,
} from '../redux/features/post-slice'

const Post = forwardRef(function Post(props, ref) {
	const { post } = props
	const theme = useTheme()
	const matchUp720 = useMediaQuery('(min-width: 720px)')
	const [openEdit, setOpenEdit] = useState(false)
	const [openDelete, setOpenDelete] = useState(false)
	const user = useSelector(state => state.auth.user)
	const dispatch = useDispatch()

	// user post menu handler
	const [open1, setOpen1] = React.useState(false)
	const anchorRef1 = React.useRef(null)

	const handleToggle1 = () => {
		setOpen1(prevOpen => !prevOpen)
	}

	const handleClose1 = event => {
		if (anchorRef1.current && anchorRef1.current.contains(event.target)) {
			return
		}

		setOpen1(false)
	}
	// end user post menu handler

	// Edit user post modal handler
	const handleOpenEdit = e => {
		handleClose1(e)
		setOpenEdit(true)
	}
	const handleCloseEdit = () => setOpenEdit(false)
	// End edit user post modal handler

	// Delete user post modal handler
	const handleOpenDelete = e => {
		handleClose1(e)
		setOpenDelete(true)
	}
	const handleCloseDelete = () => setOpenDelete(false)
	// End delete use post modal handler

	// post menu handler
	const [open2, setOpen2] = React.useState(false)
	const anchorRef2 = React.useRef(null)

	const handleToggle2 = () => {
		setOpen2(prevOpen => !prevOpen)
	}

	const handleClose2 = event => {
		if (anchorRef2.current && anchorRef2.current.contains(event.target)) {
			return
		}

		setOpen2(false)
	}

	const follow = () => {
		dispatch(followUser({userId: post.author._id, currentUser: user._id}))
	}
	const unfollow = e => {
		dispatch(unfollowUser({ userId: post.author._id, currentUser: user._id }))
		handleClose2(e)
	}

	const toggleLike = () => {
		dispatch(toggleLikePost({ postId: post._id, currentUser: user._id }))
	}

	const toggleSave = () => {
		dispatch(toggleSavePost({ postId: post._id, currentUser: user._id }))
	}
	// end post menu handler

	const formatter = Intl.NumberFormat('en', { notation: 'compact' })

	return (
		<Card
			ref={ref}
			sx={{
				padding: {
					xs: 1,
					sm: 2,
				},
				background: theme.palette.background.paper,
				filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.05))',
			}}
		>
			<EditPostModal
				open={openEdit}
				handleClose={handleCloseEdit}
				postId={post._id}
				location={post.location}
				caption={post.caption}
			/>
			<DeletePostModal
				open={openDelete}
				handleClose={handleCloseDelete}
				postId={post._id}
			/>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='flex-start'
				spacing={1}
			>
				<Stack direction='row' spacing={1.5} alignItems='flex-start'>
					<Avatar
						component={Link}
						to={`/${post.author.username}`}
						src={post.author.avatar.image}
						sx={{ width: 50, height: 50 }}
					/>
					<Stack direction='column'>
						<Typography
							component={Link}
							to={`/${post.author.username}`}
							variant='body1'
							color='text.primary'
							sx={{ lineHeight: 1.2, textDecoration: 'none', fontWeight: 500 }}
						>
							{post.author.name}
						</Typography>
						<Typography
							component={Link}
							to={`/${post.author.username}`}
							variant='body2'
							color={alpha(theme.palette.text.primary, 0.75)}
							sx={{ marginBottom: 0.3, textDecoration: 'none' }}
						>
							@{post.author.username} ·{' '}
							{relativeTime(new Date(post.createdAt).getTime())}
						</Typography>
						<Stack direction='row' alignItems='center' spacing={0.5}>
							<PlaceOutlined
								sx={{ fontSize: 16, color: theme.palette.text.secondary }}
							/>
							<Typography
								component='span'
								variant='body2'
								color='text.secondary'
							>
								{post.location}
							</Typography>
						</Stack>
					</Stack>
				</Stack>
				{post.author._id !== user._id ? (
					<Stack direction='row' alignItems='center'>
						{!post.author.followers.includes(user._id) &&
							(matchUp720 ? (
								<Button
									variant='contained'
									startIcon={<PersonAddAlt1Outlined />}
									onClick={follow}
								>
									Follow
								</Button>
							) : (
								<IconButton color='primary' onClick={follow}>
									<PersonAddAlt1Outlined />
								</IconButton>
							))}

						<Box>
							<IconButton
								size='small'
								ref={anchorRef2}
								id='post-menu-button'
								aria-controls={open2 ? 'post-menu' : undefined}
								aria-expanded={open2 ? 'true' : undefined}
								aria-haspopup='true'
								onClick={handleToggle2}
							>
								<MoreVert />
							</IconButton>
							<Popper
								open={open2}
								anchorEl={anchorRef2.current}
								role={undefined}
								placement='bottom-end'
								transition
								disablePortal
							>
								{({ TransitionProps, placement }) => (
									<Grow
										{...TransitionProps}
										style={{
											transformOrigin:
												placement === 'bottom-end' ? 'left top' : 'left bottom',
										}}
									>
										<Paper
											sx={{
												marginTop: 1,
												width: 150,
												filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
												'& .MuiMenuItem-root': {
													'&, & .MuiListItemIcon-root': {
														color: theme.palette.text.secondary,
													},
												},
												'& .MuiMenuItem-root:hover': {
													bgcolor: 'transparent',
													textDecoration: 'underline',
												},
											}}
										>
											<ClickAwayListener onClickAway={handleClose2}>
												<MenuList
													autoFocusItem={open1}
													id='post-menu'
													aria-labelledby='post-menu-button'
												>
													{post.author.followers.includes(user._id) && (
														<MenuItem onClick={unfollow}>
															<ListItemIcon>
																<PersonRemoveAlt1Outlined />
															</ListItemIcon>
															Unfollow
														</MenuItem>
													)}
													<MenuItem onClick={handleClose2}>
														<ListItemIcon>
															<FlagOutlined />
														</ListItemIcon>
														Report
													</MenuItem>
												</MenuList>
											</ClickAwayListener>
										</Paper>
									</Grow>
								)}
							</Popper>
						</Box>
					</Stack>
				) : (
					<>
						<IconButton
							size='small'
							ref={anchorRef1}
							id='user-post-menu-button'
							aria-controls={open1 ? 'user-post-menu' : undefined}
							aria-expanded={open1 ? 'true' : undefined}
							aria-haspopup='true'
							onClick={handleToggle1}
						>
							<MoreVert />
						</IconButton>
						<Popper
							open={open1}
							anchorEl={anchorRef1.current}
							role={undefined}
							placement='bottom-end'
							transition
							disablePortal
						>
							{({ TransitionProps, placement }) => (
								<Grow
									{...TransitionProps}
									style={{
										transformOrigin:
											placement === 'bottom-end' ? 'left top' : 'left bottom',
									}}
								>
									<Paper
										sx={{
											marginTop: 1,
											width: 150,
											filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
											'& .MuiMenuItem-root': {
												'&, & .MuiListItemIcon-root': {
													color: theme.palette.text.secondary,
												},
											},
											'& .MuiMenuItem-root:hover': {
												bgcolor: 'transparent',
												textDecoration: 'underline',
											},
										}}
									>
										<ClickAwayListener onClickAway={handleClose1}>
											<MenuList
												autoFocusItem={open1}
												id='user-post-menu'
												aria-labelledby='user-post-menu-button'
											>
												<MenuItem onClick={handleOpenEdit}>
													<ListItemIcon>
														<EditOutlined />
													</ListItemIcon>
													Edit
												</MenuItem>
												<MenuItem onClick={handleOpenDelete}>
													<ListItemIcon>
														<DeleteOutlined />
													</ListItemIcon>
													Delete
												</MenuItem>
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</>
				)}
			</Stack>
			<Box sx={{ padding: theme.spacing(2, 1) }}>
				<Typography variant='body2' color='text.secondary'>
					{post.caption}
				</Typography>
			</Box>

			<CardMedia
				component='img'
				height='auto'
				image={post.image.original}
				sx={{
					width: '100%',
					overflow: 'hidden',
					borderRadius: 1,
				}}
			/>

			<Stack direction='row' justifyContent='space-around'>
				<Stack
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
				>
					<IconButton onClick={toggleLike}>
						{post.likedBy.includes(user._id) ? (
							<Favorite
								sx={{
									fontSize: 30,
									color: theme.palette.error.light,
								}}
							/>
						) : (
							<FavoriteBorder
								sx={{
									fontSize: 30,
									color: theme.palette.error.light,
								}}
							/>
						)}
					</IconButton>
					<Typography>{formatter.format(post.noOfLikes)}</Typography>
				</Stack>
				<Stack
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
				>
					<IconButton onClick={toggleSave}>
						{post.savedBy.includes(user._id) ? (
							<Bookmark
								sx={{
									fontSize: 30,
									color: theme.palette.warning.light,
								}}
							/>
						) : (
							<BookmarkBorder
								sx={{
									fontSize: 30,
									color: theme.palette.warning.light,
								}}
							/>
						)}
					</IconButton>
					<Typography>{formatter.format(post.noOfSaves)}</Typography>
				</Stack>
			</Stack>
		</Card>
	)
})

export default Post
