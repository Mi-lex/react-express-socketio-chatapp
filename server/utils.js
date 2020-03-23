const getRandomArrayElement = (arr) =>
	arr[Math.floor(Math.random() * arr.length)]

const generateId = () =>
	Math.random()
		.toString(36)
		.substr(2)

module.exports = { getRandomArrayElement, generateId }
