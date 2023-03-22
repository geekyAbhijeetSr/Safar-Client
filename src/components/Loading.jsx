import { Player } from '@lottiefiles/react-lottie-player'
import { Box } from '@mui/material'
import React from 'react'

function Loading() {
	return (
		<Box>
			<Player
				autoplay
				speed={0.75}
				src='https://lottie.host/37dabc8a-78e2-44d7-8743-ab6dcae805bb/jlm1NWUmWl.json'
				style={{ height: '200px', width: '100%' }}
			/>
		</Box>
	)
}

export default Loading
