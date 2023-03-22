export function debounce(cb, delay = 500) {
    let timerId
    return function (...args) {
        clearTimeout(timerId)
        const context = this
        timerId = setTimeout(() => {
            cb.apply(context, args)
        }, delay)
    }
}