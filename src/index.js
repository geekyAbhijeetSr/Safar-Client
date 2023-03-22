import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import ThemeHandler from './ThemeHandler'
import { Provider } from 'react-redux'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
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
