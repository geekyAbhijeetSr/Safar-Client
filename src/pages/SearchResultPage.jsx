import { Player } from '@lottiefiles/react-lottie-player'
import { Box, Skeleton, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SearchItem from '../components/SearchItem'
import { getMoreSearchResult } from '../redux/features/search-result-slice'

function SearchResultPage() {
	const {
		query,
		fetchingNewSearchResult,
		fetchingMoreSearchResult,
		searchResult,
	} = useSelector(state => state.search_result)
	const navigate = useNavigate()
	const [triggerFetch, setTriggerFetch] = useState(true)
	const dispatch = useDispatch()

	const observer = useRef()
	const lastItemRef = useCallback(
		node => {
			if (fetchingNewSearchResult || fetchingMoreSearchResult) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting) {
					setTriggerFetch(true)
				}
			})
			if (node) observer.current.observe(node)
		},
		[fetchingNewSearchResult, fetchingMoreSearchResult]
	)

	useEffect(() => {
		if (triggerFetch && searchResult.nextPage > 1) {
			dispatch(
				getMoreSearchResult({
					search_query: query,
					page: searchResult.nextPage,
				})
			)
			setTriggerFetch(false)
		} else {
			setTriggerFetch(false)
		}
	}, [triggerFetch, dispatch, searchResult.nextPage, query, navigate])

	if (fetchingNewSearchResult) {
		return (
			<Stack spacing={2}>
				<Skeleton variant='rounded' width='100%' height={82} />
				<Skeleton variant='rounded' width='100%' height={82} />
				<Skeleton variant='rounded' width='100%' height={82} />
				<Skeleton variant='rounded' width='100%' height={82} />
				<Skeleton variant='rounded' width='100%' height={82} />
				<Skeleton variant='rounded' width='100%' height={82} />
				<Skeleton variant='rounded' width='100%' height={82} />
				<Skeleton variant='rounded' width='100%' height={82} />
				<Skeleton variant='rounded' width='100%' height={82} />
				<Skeleton variant='rounded' width='100%' height={82} />
			</Stack>
		)
	}

	if (searchResult?.docs?.length > 0) {
		return (
			<Stack spacing={2} sx={{ paddingBottom: '1rem' }}>
				{searchResult?.docs?.length > 0 &&
					searchResult.docs.map((item, index) => {
						if (searchResult.docs.length - 1 === index) {
							return <SearchItem ref={lastItemRef} item={item} key={index} />
						} else {
							return <SearchItem item={item} key={index} />
						}
					})}

				{fetchingMoreSearchResult && (
					<>
						<Skeleton variant='rounded' width='100%' height={82} />
						<Skeleton variant='rounded' width='100%' height={82} />
						<Skeleton variant='rounded' width='100%' height={82} />
						<Skeleton variant='rounded' width='100%' height={82} />
					</>
				)}
			</Stack>
		)
	} else {
		return (
			<Box>
				<Player
					autoplay
					speed={2}
					src='https://assets9.lottiefiles.com/packages/lf20_b4hn3bqt.json'
					style={{ height: '200px', width: '100%' }}
				/>

				<Typography variant='h4' textAlign='center'>
					No results found!
				</Typography>
			</Box>
		)
	}
}

export default SearchResultPage
