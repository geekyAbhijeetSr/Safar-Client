import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts } from '../redux/features/post-slice'
import Post from './Post'
import Empty from './Empty'
import { Skeleton } from '@mui/material'

function UserPosts() {
	const { fetchingUserPosts, userPosts, profileUser } = useSelector(
		state => state.post
	)
	const dispatch = useDispatch()
	const [triggerFetch, setTriggerFetch] = useState(true)

	const observer = useRef()
	const lastPostRef = useCallback(
		node => {
			if (fetchingUserPosts) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting) {
					setTriggerFetch(true)
				}
			})
			if (node) observer.current.observe(node)
		},
		[fetchingUserPosts]
	)

	useEffect(() => {
		if (triggerFetch && userPosts.nextPage) {
			dispatch(
				getUserPosts({
					userId: profileUser._id,
					page: userPosts.nextPage,
				})
			)

			setTriggerFetch(false)
		} else {
			setTriggerFetch(false)
		}
	}, [triggerFetch, dispatch, profileUser._id, userPosts.nextPage])

	return (
		<>
			{userPosts?.docs?.length > 0
				? userPosts.docs.map((post, index) => {
						if (userPosts.docs.length - 1 === index) {
							return <Post ref={lastPostRef} post={post} key={index} />
						} else {
							return <Post post={post} key={index} />
						}
				  })
				: !fetchingUserPosts && userPosts?.docs?.length === 0 && <Empty />}

			{fetchingUserPosts && (
				<>
					<Skeleton variant='rounded' width='100%' height='80vh' />
					<Skeleton variant='rounded' width='100%' height='80vh' />
				</>
			)}
		</>
	)
}

export default UserPosts
