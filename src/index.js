import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import ThemeHandler from './ThemeHandler'
import { Provider } from 'react-redux'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

// message for delay in request caused by free hosting of backend
setTimeout(() => {
	alert(`I'm currently using a free hosting service for backend, free instance will spin down with inactivity, which can delay requests by 50 seconds or more, which means there might be a short delay when you first interact with the application. I apologize for any inconvenience this may cause.

Thank you for your patience.`)
}, 2000)
root.render(
	// <React.StrictMode>
	<BrowserRouter>
		<Provider store={store}>
			<ThemeHandler>
				<App />
			</ThemeHandler>
		</Provider>
	</BrowserRouter>
	// </React.StrictMode>
)
