// @ts-nocheck
$(function() {
    navigator.serviceWorker.register('sw.js');
    let worker = new Worker('worker.js')

    $('#go_timer').click(_ => {
        let time = $('#time').val()
        worker.postMessage({ command: 'timer-start', params: { time } })
    })
    $('#go_test').click(_ => showNotification('Test notification'))

    worker.onmessage = msg => {
        let params = msg.data.params
		switch (msg.data.command) {
            case 'timer-end': return domlog('Timer end')
            case 'dom-log': return domlog(...params)
            case 'notify': return showNotification(params.title, params.options)
			default: throw Error('Unknown command: ' + command)
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
        $('#logarea').append(params.join(' ') + '\n')
    }

    function showNotification(msg, options) {
        domlog('Notification:', msg, options)
        try {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(msg, options)
                domlog('Notification sent')
            })
        } catch (e) {
            domlog('showNotification error:', e.message)
        }
    }
})
