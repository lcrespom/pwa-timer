console.log("Hello from worker")

self.onmessage = msg => {
	switch (msg.data.command) {
		case "timer-start": return startTimer(msg.data.params)
		default: throw Error("Unknown command: " + msg.data.command)
	}
}

function startTimer(params) {
	domlog("W: start timer", params)
	domlog("W: Notification.permission:", Notification.permission)
	setTimeout(() => {
		try {
			timerNotification(params.time)
			domlog("W: end timer")
			// @ts-ignore
			postMessage({ command: "timer-end", params })
		} catch (e) {
			domlog("Exception inside setTimeout:", e.message)
		}
	}, params.time * 1000)
}

function timerNotification(time) {
	if (Notification.permission != "granted") return
	navigator.serviceWorker.ready.then(registration =>
		registration.showNotification('Timer: ' + time)
	)
}

function domlog(...params) {
	// @ts-ignore
	postMessage({ command: "dom-log", params })
}
