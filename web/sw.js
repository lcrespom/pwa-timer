console.log('Hello from SW')

self.onmessage = msg => {
	switch (msg.data.command) {
		case 'timer-start': return startTimer(msg.data.params)
		default: throw Error('Unknown command: ' + msg.data.command)
	}
}

function startTimer(params) {
    console.log('SW: start timer', params)
    setTimeout(() => {
        console.log('SW: end timer')
        postMessage({ command: 'timer-end', params })
    }, params.time * 1000)
}