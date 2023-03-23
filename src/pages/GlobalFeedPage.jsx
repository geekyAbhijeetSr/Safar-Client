import { Skeleton, Stack } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import { getGlobalPosts } from '../redux/features/post-slice'
import Empty from '../components/Empty'
import { renewToken } from '../redux/features/auth-slice'

function GlobalFeedPage() {
	const { user, tokenRenewed, exp } = useSelector(state => state.auth)
	const { fetchingGlobalPosts, globalPosts } = useSelector(state => state.post)
	const [triggerFetch, setTriggerFetch] = useState(true)
	const dispatch = useDispatch()

	document.title = 'Safar - Global'

	const observer = useRef()
	const lastPostRef = useCallback(
		node => {
			if (fetchingGlobalPosts) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting) {
					setTriggerFetch(true)
				}
			})
			if (node) observer.current.observe(node)
		},
		[fetchingGlobalPosts]
	)

	useEffect(() => {
		if (triggerFetch && globalPosts.nextPage) {
			dispatch(
				getGlobalPosts({
					page: globalPosts.nextPage,
				})
			)

			setTriggerFetch(false)
		} else {
			setTriggerFetch(false)
		}
	}, [triggerFetch, dispatch, globalPosts.nextPage])

	useEffect(() => {
		const userInLocal = localStorage.getItem('user')
		if (
			!tokenRenewed &&
			userInLocal &&
			user?._id === JSON.parse(userInLocal)?._id &&
			new Date().getTime() < exp
		) {
			dispatch(renewToken(user._id))
		}
	}, [user._id, tokenRenewed, dispatch, exp])

	return (
		<Stack spacing={2} sx={{ paddingBottom: '1rem' }}>
			{globalPosts?.docs?.length > 0
				? globalPosts.docs.map((post, index) => {
						if (globalPosts.docs.length - 1 === index) {
							return <Post ref={lastPostRef} post={post} key={index} />
						} else {
							return <Post post={post} key={index} />
						}
				  })
				: !fetchingGlobalPosts && globalPosts?.docs?.length === 0 && <Empty />}

			{fetchingGlobalPosts && (
				<>
					<Skeleton variant='rounded' width='100%' height='80vh' />
					<Skeleton variant='rounded' width='100%' height='80vh' />
				</>
			)}
		</Stack>
	)
}

export default GlobalFeedPage
