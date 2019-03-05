// @ts-ignore
$(function() {
    let worker = new Worker('worker.js')

    // @ts-ignore
    $('#go_timer').click(_ => {
        // @ts-ignore
        let time = $('#time').val()
        worker.postMessage({ command: 'timer-start', params: { time } })
    })

    worker.onmessage = msg => {
		switch (msg.data.command) {
            case 'timer-end': return domlog('Timer end')
            case 'dom-log': return domlog(...msg.data.params)
			default: throw Error('Unknown command: ' + msg.data.command)
		}
    }

    Notification.requestPermission()
        .then(result => domlog('Notification:', result))

    function domlog(...params) {
        params = params.map(
            param => typeof param == 'string'
                ? param
                : JSON.stringify(param)
        )
        // @ts-ignore
        $('#logarea').append(params.join(' ') + '\n')
    }
})
