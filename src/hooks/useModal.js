import bus from '@/utils/bus'

const EVENT_NAME = 'modal:toggle'

export default function useModal () {
  function open (payload = {}) {
    bus.emit(EVENT_NAME, { status: true, ...payload })
  }

  function close (payload = {}) {
    bus.emit(EVENT_NAME, { status: false, ...payload })
  }

  function listen (fn) {
    bus.on(EVENT_NAME, fn)
  }

  function off (fn) {
    bus.off(EVENT_NAME, fn)
  }

  return { open, close, listen, off }

  // listen = escutando os eventos
  // off = para de escutar o evento / ainda lida com eventos evita memory leak
}
