import { Player } from '@lottiefiles/react-lottie-player'
import { Box, Typography } from '@mui/material'
import React from 'react'

function Empty() {
  return (
		<Box>
			<Player
				autoplay
				speed={0.75}
				src='https://assets10.lottiefiles.com/packages/lf20_9zgpyoqd.json'
				style={{ height: '200px', width: '100%' }}
			/>

			<Typography variant='h4' textAlign='center'>
				Wow, such empty
			</Typography>
		</Box>
	)
}

export default Empty