import { Skeleton, Stack } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Empty from '../components/Empty'
import Post from '../components/Post'
import { getSavedPosts } from '../redux/features/post-slice'

function SavedPage() {
	const { fetchingSavedPosts, savedPosts } = useSelector(state => state.post)
	const [triggerFetch, setTriggerFetch] = useState(true)
	const dispatch = useDispatch()

	document.title = 'Safar - Saved'

	const observer = useRef()
	const lastPostRef = useCallback(
		node => {
			if (fetchingSavedPosts) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting) {
					setTriggerFetch(true)
				}
			})
			if (node) observer.current.observe(node)
		},
		[fetchingSavedPosts]
	)

	useEffect(() => {
		if (triggerFetch && savedPosts.nextPage) {
			dispatch(
				getSavedPosts({
					page: savedPosts.nextPage,
				})
			)

			setTriggerFetch(false)
		} else {
			setTriggerFetch(false)
		}
	}, [triggerFetch, dispatch, savedPosts.nextPage])

	return (
		<Stack spacing={2} sx={{ paddingBottom: '1rem' }}>
			{savedPosts?.docs?.length > 0
				? savedPosts.docs.map((post, index) => {
						if (savedPosts.docs.length - 1 === index) {
							return <Post ref={lastPostRef} post={post} key={index} />
						} else {
							return <Post post={post} key={index} />
						}
				  })
				: !fetchingSavedPosts && savedPosts?.docs?.length === 0 && <Empty />}

			{fetchingSavedPosts && (
				<>
					<Skeleton variant='rounded' width='100%' height='80vh' />
					<Skeleton variant='rounded' width='100%' height='80vh' />
				</>
			)}
		</Stack>
	)
}

export default SavedPage
