import {
	Box,
	Button,
	Paper,
	Typography,
	useTheme,
	useMediaQuery,
} from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'

function ResetLinkTokenError(props) {
	const theme = useTheme()
	const navigate = useNavigate()
	const matchMdUp = useMediaQuery(theme.breakpoints.up('md'))
	const matchSmUp = useMediaQuery(theme.breakpoints.up('sm'))
    const match375Up = useMediaQuery('(min-width: 375px)')
    const playerRef = useRef()

    useEffect(() => {
        let timerId
        if (playerRef.current) {
            timerId = setTimeout(() => {
                playerRef.current.pause()
            }, 5200)
		}
		
		return () => {
			clearTimeout(timerId)
		}
    }, [])

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'grid',
				placeItems: 'center',
				background: matchSmUp
					? theme.palette.background.default
					: theme.palette.background.paper,
			}}
		>
			<Paper
				sx={{
					width: matchMdUp ? 750 : match375Up ? 375 : '100%',
					minHeight: match375Up ? 600 : 400,
					display: 'flex',
					flexDirection: 'row',
					background: theme.palette.background.paper,
					overflow: 'hidden',
					filter: matchSmUp
						? 'drop-shadow(0px 2px 8px rgba(0,0,0,0.05))'
						: 'none',
					marginTop: matchSmUp ? 0 : '-4rem',
				}}
			>
				{matchMdUp && (
					<Box
						sx={{
							flex: 1,
						}}
					>
						<Player
							autoplay
							src='https://assets9.lottiefiles.com/packages/lf20_pNx6yH.json'
							style={{ width: '110%', marginTop: '5rem' }}
							speed={1.5}
							ref={playerRef}
						/>
					</Box>
				)}
				<Box
					sx={{
						flex: 1,
						padding: '1.5rem',
						display: 'flex',
						alignItems: 'flex-start',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography
						component='h3'
						variant='h3'
						sx={{
							color: theme.palette.primary.main,
							marginBottom: '0.5rem',
						}}
					>
						{props.errorHeading}
					</Typography>
					<Typography
						component='h5'
						variant='subtitle1'
						sx={{
							color: theme.palette.text.secondary,
							marginBottom: '1.5rem',
						}}
					>
						{props.errorMsg}
					</Typography>

					<Button
						sx={{
							display: 'block',
						}}
						variant='contained'
						type='submit'
						onClick={() => {
							navigate('/forgot-password')
						}}
					>
						Request New Link
					</Button>
				</Box>
			</Paper>
		</Box>
	)
}

export default ResetLinkTokenError
