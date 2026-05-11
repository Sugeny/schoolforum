import log from 'loglevel'

const isDev = import.meta.env.DEV

if (isDev) {
  log.setLevel('debug')
} else {
  log.setLevel('silent')
}

export default log
