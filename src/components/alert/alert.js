import notification from './notification'

let messageInstace = null

function getMessageInstace () {
  messageInstace = messageInstace || notification.newInstance()
  return messageInstace
}

function notice ({ content, duration = 1.5 }) {
  const instance = getMessageInstace()

  instance.add({
    content,
    duration
  })
}

export default {
  info (options) {
    return notice(options)
  }
}
