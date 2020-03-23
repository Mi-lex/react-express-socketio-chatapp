import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequested'

export let baseUrl = ''

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	baseUrl = 'http://127.0.0.1:3010'
} else {
	baseUrl = '/'
}

export default axios.create({
	baseURL: baseUrl,
})
