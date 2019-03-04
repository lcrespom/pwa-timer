$(function() {
    let worker = new Worker('sw.js')

    $('#go_timer').click(_ => {
        let time = $('#time').val()
        worker.postMessage({ command: 'timer-start', params: { time } })
    })

    worker.onmessage = msg => {
		switch (msg.data.command) {
			case 'timer-end': return console.log('Timer end')
			default: throw Error('Unknown command: ' + msg.data.command)
		}
	}
})
