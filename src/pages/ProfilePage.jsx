import { Skeleton, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProfileCard from '../components/ProfileCard'
import UserPosts from '../components/UserPosts'
import { getProfileUser } from '../redux/features/post-slice'

function ProfilePage() {
	const { username } = useParams()
	const { fetchingProfileUser, profileUser } = useSelector(state => state.post)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getProfileUser(username))
	}, [username, dispatch])

	return (
		<Stack spacing={2} sx={{ paddingBottom: '1rem' }}>
			{!fetchingProfileUser ? (
				<>
					<ProfileCard profileUser={profileUser} />
					{profileUser?._id && <UserPosts />}
				</>
			) : (
				<Skeleton variant='rounded' width='100%' height={400} />
			)}
		</Stack>
	)
}

export default ProfilePage
