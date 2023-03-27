import {
	PersonAddAlt1Outlined,
	PersonRemoveAlt1Outlined,
	EditOutlined,
} from '@mui/icons-material'
import {
	alpha,
	Avatar,
	Box,
	Button,
	Divider,
	Stack,
	Typography,
	useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { followUser, unfollowUser } from '../redux/features/post-slice'
import BannerPicModal from './BannerPicModal'
import ProfilePicModal from './ProfilePicModal'
import UserNotFound from './UserNotFound'

function ProfileCard({ profileUser }) {
	const theme = useTheme()
	const navigate = useNavigate()
	const formatter = Intl.NumberFormat('en', { notation: 'compact' })
	const { user } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	const [showProfilePic, setShowProfilePic] = useState(false)
	const [showBannerPic, setShowBannerPic] = useState(false)

	const followOrUnfollow = () => {
		if (profileUser.followers.includes(user._id)) {
			dispatch(unfollowUser({userId: profileUser._id, currentUser: user._id}))
		} else {
			dispatch(followUser({ userId: profileUser._id, currentUser: user._id }))
		}
	}

	if (!profileUser) return <UserNotFound />

	return (
		<>
			<ProfilePicModal
				open={showProfilePic}
				handleClose={() => setShowProfilePic(false)}
				profilePic={profileUser.avatar.image}
			/>
			<BannerPicModal
				open={showBannerPic}
				handleClose={() => setShowBannerPic(false)}
				bannerPic={profileUser.banner.image}
			/>

			<Box
				sx={{
					background: theme.palette.background.paper,
					borderRadius: 1,
					padding: 2,
				}}
			>
				<Stack direction='column'>
					{/* banner */}
					<Box
						sx={{
							position: 'relative',
							borderRadius: theme.spacing(1.4, 1.4, 0, 0),
							overflow: 'hidden',
						}}
					>
						<Box
							sx={{
								paddingBottom: '33.3333%',
							}}
						/>
						<Box
							sx={{
								position: 'absolute',
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								width: '100%',
								height: '100%',
								zIndex: 0,
							}}
						>
							<Box
								sx={{
									backgroundImage: `url(${profileUser.banner.image})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center center',
									height: '100%',
									width: '100%',
									cursor: 'pointer',
								}}
								onClick={() => setShowBannerPic(true)}
							/>
						</Box>
					</Box>

					{/* profile info */}
					<Box
						sx={{
							padding: theme.spacing(1, 2, 0, 2),
						}}
					>
						<Stack
							direction='row'
							justifyContent='space-between'
							alignItems='flex-start'
							flexWrap='wrap'
							spacing={1}
						>
							<Box
								sx={{
									width: '25%',
									minWidth: 100,
									aspectRatio: '1 / 1',
									marginTop: '-15%',
								}}
							>
								<Avatar
									src={profileUser.avatar.image}
									sx={{
										width: '100%',
										height: '100%',
										border: `8px solid ${theme.palette.background.paper}`,
										cursor: 'pointer',
									}}
									onClick={() => setShowProfilePic(true)}
								/>
							</Box>
							{profileUser.username === user.username ? (
								<Button
									variant='outlined'
									startIcon={<EditOutlined />}
									onClick={() => navigate('/settings/editprofile')}
								>
									Edit profile
								</Button>
							) : (
								<Box onClick={followOrUnfollow}>
									{profileUser.followers.includes(user._id) ? (
										<Button
											variant='outlined'
											startIcon={<PersonRemoveAlt1Outlined />}
										>
											Unfollow
										</Button>
									) : (
										<Button
											variant='contained'
											startIcon={<PersonAddAlt1Outlined />}
										>
											Follow
										</Button>
									)}
								</Box>
							)}
						</Stack>
						<Stack alignItems='flex-start' mt={1}>
							<Typography
								component='h6'
								variant='h6'
								sx={{
									color: theme.palette.text.primary,
									lineHeight: 1.2,
									fontWeight: 500,
								}}
							>
								{profileUser.name}
							</Typography>
							<Typography
								component='p'
								variant='body1'
								sx={{
									fontWeight: 400,
									color: theme.palette.text.secondary,
									mb: 1,
								}}
							>
								@{profileUser.username}
							</Typography>
						</Stack>

						<Typography
							component='p'
							variant='body2'
							sx={{
								color: alpha(theme.palette.text.primary, 0.8),
								mt: 1,
							}}
						>
							{profileUser.bio}
						</Typography>
					</Box>
				</Stack>
				<Divider sx={{ marginTop: 2 }}></Divider>
				<Stack direction='row' mt={1}>
					<Stack direction='column' alignItems='center' sx={{ flex: 1 }}>
						<Typography variant='subtitle1' color='text.primary'>
							{formatter.format(profileUser.noOfPosts)}
						</Typography>
						<Typography variant='subtitle1' color='text.secondary'>
							Posts
						</Typography>
					</Stack>
					<Stack direction='column' alignItems='center' sx={{ flex: 1 }}>
						<Typography variant='subtitle1' color='text.primary'>
							{formatter.format(profileUser.noOfFollowers)}
						</Typography>
						<Typography variant='subtitle1' color='text.secondary'>
							Followers
						</Typography>
					</Stack>
					<Stack direction='column' alignItems='center' sx={{ flex: 1 }}>
						<Typography variant='subtitle1' color='text.primary'>
							{formatter.format(profileUser.noOfFollowing)}
						</Typography>
						<Typography variant='subtitle1' color='text.secondary'>
							Following
						</Typography>
					</Stack>
				</Stack>
			</Box>
		</>
	)
}

export default ProfileCard
