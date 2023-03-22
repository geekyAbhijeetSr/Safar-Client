import {
	Avatar,
	Box,
	Divider,
	Stack,
	Typography,
	useTheme,
} from '@mui/material'
import React from 'react'

function UserNotFound() {
    const theme = useTheme()

	return (
		<Box
			sx={{
				background: theme.palette.background.paper,
				borderRadius: 1,
				padding: 2,
			}}
		>
			<Stack direction='column'>
				{/* banner */}
				<Box
					sx={{
						position: 'relative',
						borderRadius: theme.spacing(1.4, 1.4, 0, 0),
						overflow: 'hidden',
					}}
				>
					<Box
						sx={{
							paddingBottom: '33.3333%',
						}}
					/>
					<Box
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
							width: '100%',
							height: '100%',
							zIndex: 0,
						}}
					>
						<Box
							sx={{
								backgroundImage: `url(https://res.cloudinary.com/cloudinary-v3/image/upload/v1675240154/Assets/tree_vdmy50.jpg)`,
								backgroundSize: 'cover',
								backgroundPosition: 'center center',
								height: '100%',
								width: '100%',
							}}
						/>
					</Box>
				</Box>

				{/* profile info */}
				<Box
					sx={{
						padding: theme.spacing(1, 2, 0, 2),
					}}
				>
					<Stack
						direction='row'
						justifyContent='space-between'
						alignItems='flex-start'
						flexWrap='wrap'
						spacing={1}
					>
						<Box
							sx={{
								width: '25%',
								minWidth: 85,
								aspectRatio: '1 / 1',
								marginTop: '-15%',
							}}
						>
							<Avatar
								src='https://api.dicebear.com/5.x/adventurer-neutral/svg?backgroundRotation=0'
								sx={{
									width: '100%',
									height: '100%',
									border: `5px solid ${theme.palette.background.paper}`,
								}}
							/>
						</Box>
					</Stack>
					<Stack alignItems='flex-start' mt={1}>
						<Typography
							component='h6'
							variant='h6'
							sx={{
								color: theme.palette.text.primary,
								lineHeight: 1.2,
								fontWeight: 500,
							}}
						>
							User not found!
						</Typography>
					</Stack>
				</Box>
			</Stack>
			<Divider sx={{ marginTop: 2 }}></Divider>
			<Stack direction='row' mt={1}>
				<Stack direction='column' alignItems='center' sx={{ flex: 1 }}>
					<Typography variant='subtitle1' color='text.primary'>
						0
					</Typography>
					<Typography variant='subtitle1' color='text.secondary'>
						Posts
					</Typography>
				</Stack>
				<Stack direction='column' alignItems='center' sx={{ flex: 1 }}>
					<Typography variant='subtitle1' color='text.primary'>
						0
					</Typography>
					<Typography variant='subtitle1' color='text.secondary'>
						Followers
					</Typography>
				</Stack>
				<Stack direction='column' alignItems='center' sx={{ flex: 1 }}>
					<Typography variant='subtitle1' color='text.primary'>
						0
					</Typography>
					<Typography variant='subtitle1' color='text.secondary'>
						Following
					</Typography>
				</Stack>
			</Stack>
		</Box>
	)
}

export default UserNotFound
