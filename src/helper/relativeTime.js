function relativeTime(previousTime) {
	if (previousTime === undefined) return ''
	const msPerMinute = 60 * 1000
	const msPerHour = msPerMinute * 60
	const msPerDay = msPerHour * 24
	const msPerWeek = msPerDay * 7
	const msPerMonth = msPerDay * 30
	const msPerYear = msPerDay * 360

	const elapsed = new Date().getTime() - previousTime

	if (elapsed < msPerMinute) {
		return Math.round(elapsed / 1000) + ' s ago'
	} else if (elapsed < msPerHour) {
		return Math.round(elapsed / msPerMinute) + ' min ago'
	} else if (elapsed < msPerDay) {
		return Math.round(elapsed / msPerHour) + ' h ago'
	} else if (elapsed < msPerWeek) {
		return Math.round(elapsed / msPerDay) + ' d ago'
	} else if (elapsed < msPerMonth) {
		return Math.round(elapsed / msPerWeek) + ' wk ago'
	} else if (elapsed < msPerYear) {
		return Math.round(elapsed / msPerMonth) + ' mo ago'
	} else {
		return Math.round(elapsed / msPerYear) + ' y ago'
	}
}

export default relativeTime
