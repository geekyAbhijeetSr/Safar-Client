import {
	PersonAddAlt1Outlined,
	PersonRemoveAlt1Outlined,
} from '@mui/icons-material'
import {
	alpha,
	Avatar,
	Box,
	Button,
	Card,
	Stack,
	Typography,
	useTheme,
} from '@mui/material'
import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { inSearchFollowUser, inSearchUnfollowUser } from '../redux/features/search-result-slice'

const SearchItem = forwardRef(function (props, ref) {
	const theme = useTheme()
	const user = useSelector(state => state.auth.user)
	const { item } = props
	const dispatch = useDispatch()

	const followOrUnfollow = () => {
		if (item.followers.includes(user._id)) {
			dispatch(inSearchUnfollowUser(item._id))
		} else {
			dispatch(inSearchFollowUser(item._id))
		}
	}

	return (
		<Card
			ref={ref}
			sx={{
				padding: 2,
				background: theme.palette.background.paper,
				filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.05))',
			}}
		>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='flex-start'
				spacing={1}
			>
				<Stack direction='row' spacing={1.5} alignItems='flex-start'>
					<Avatar
						component={Link}
						to={`/${item.username}`}
						src={item.avatar.image}
						sx={{ width: 50, height: 50 }}
					/>
					<Stack direction='column'>
						<Typography
							component={Link}
							to={`/${item.username}`}
							variant='body1'
							color='text.primary'
							sx={{
								lineHeight: 1.2,
								textDecoration: 'none',
								fontWeight: 500,
							}}
						>
							{item.name}
						</Typography>
						<Typography
							component={Link}
							to={`/${item.username}`}
							variant='body2'
							color={alpha(theme.palette.text.primary, 0.75)}
							sx={{ marginBottom: 0.3, textDecoration: 'none' }}
						>
							@{item.username}
						</Typography>
					</Stack>
				</Stack>

				{item._id !== user._id && (
					<Box onClick={followOrUnfollow}>
						{item.followers.includes(user._id) ? (
							<Button
								variant='outlined'
								startIcon={<PersonRemoveAlt1Outlined />}
							>
								Unfollow
							</Button>
						) : (
							<Button variant='contained' startIcon={<PersonAddAlt1Outlined />}>
								Follow
							</Button>
						)}
					</Box>
				)}
			</Stack>
		</Card>
	)
})

export default SearchItem
