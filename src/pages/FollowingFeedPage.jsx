import { Skeleton, Stack } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Empty from '../components/Empty'
import Post from '../components/Post'
import { getFollowingPosts } from '../redux/features/post-slice'

function FollowingFeedPage() {
	const { fetchingFollowingPosts, followingPosts } = useSelector(
		state => state.post
	)
	const [triggerFetch, setTriggerFetch] = useState(true)
	const dispatch = useDispatch()

	document.title = 'Safar - Following'

	const observer = useRef()
	const lastPostRef = useCallback(
		node => {
			if (fetchingFollowingPosts) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting) {
					setTriggerFetch(true)
				}
			})
			if (node) observer.current.observe(node)
		},
		[fetchingFollowingPosts]
	)

	useEffect(() => {
		if (triggerFetch && followingPosts.nextPage) {
			dispatch(
				getFollowingPosts({
					page: followingPosts.nextPage,
				})
			)

			setTriggerFetch(false)
		} else {
			setTriggerFetch(false)
		}
	}, [triggerFetch, dispatch, followingPosts.nextPage])

	return (
		<Stack spacing={2} sx={{ paddingBottom: '1rem' }}>
			{followingPosts?.docs?.length > 0
				? followingPosts.docs.map((post, index) => {
						if (followingPosts.docs.length - 1 === index) {
							return <Post ref={lastPostRef} post={post} key={index} />
						} else {
							return <Post post={post} key={index} />
						}
				  })
				: !fetchingFollowingPosts &&
				  followingPosts?.docs?.length === 0 && <Empty />}

			{fetchingFollowingPosts && (
				<>
					<Skeleton variant='rounded' width='100%' height='80vh' />
					<Skeleton variant='rounded' width='100%' height='80vh' />
				</>
			)}
		</Stack>
	)
}

export default FollowingFeedPage
