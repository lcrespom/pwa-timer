// @ts-nocheck
console.log('Hello from worker')

self.onmessage = msg => {
	switch (msg.data.command) {
		case 'timer-start': return startTimer(msg.data.params)
		default: throw Error('Unknown command: ' + msg.data.command)
	}
}

function startTimer(params) {
	domlog('W: start timer', params)
	domlog('W: Notification.permission:', Notification.permission)
	setTimeout(() => {
		try {
			timerNotification(params.time)
			domlog('W: end timer')
			postMessage({ command: 'timer-end', params })
		} catch (e) {
			domlog('Exception inside setTimeout:', e.message)
		}
	}, params.time * 1000)
}

function timerNotification(time) {
	if (Notification.permission != 'granted') return
	let title = 'Timer: ' + time
	postMessage({ command: 'notify', params: { title }})
}

function domlog(...params) {
	postMessage({ command: 'dom-log', params })
}
