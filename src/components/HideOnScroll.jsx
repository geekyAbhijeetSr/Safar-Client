import { Slide, useMediaQuery, useScrollTrigger } from "@mui/material"

function HideOnScroll(props) {
    const { children, direction } = props
    const trigger = useScrollTrigger()
    const matchSmUp = useMediaQuery(theme => theme.breakpoints.up('sm'))

    if (matchSmUp) return (
        <>
            {children}
        </>
    )
    return (
        <Slide appear={false} direction={direction || 'down'} in={!trigger}>
			{children}
		</Slide>
	)
}

export default HideOnScroll