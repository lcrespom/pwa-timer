console.log('Hello from SW')

self.onmessage = msg => {
	switch (msg.data.command) {
		case 'timer-start': return startTimer(msg.data.params)
		default: throw Error('Unknown command: ' + msg.data.command)
	}
}

function startTimer(params) {
    domlog('SW: start timer', params)
    setTimeout(() => {
        timerNotification(params.time)
        domlog('SW: end timer')
        // @ts-ignore
        postMessage({ command: 'timer-end', params })
    }, params.time * 1000)
}

function timerNotification(time) {
    if (Notification.permission != 'granted') return
    new Notification('Timer: ' + time)
}

function domlog(...params) {
    // @ts-ignore
    postMessage({ command: 'dom-log', params })
}