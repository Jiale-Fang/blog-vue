import store from "../store";
function useWebSocket (handleMessage) {
  var username = store.state.username
  if (username == null) {
    username = ''
  }
  // const ws = new WebSocket(`ws://127.0.0.1:9002/admin/chat/${username}`)
  const ws = new WebSocket(`wss://www.tcefrep.site/admin/chat/${username}`)
  const init = () => {
    bindEvent()
  }
  function bindEvent () {
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false)
  }
  function handleOpen (e) {
    console.log('open', e)
  }
  function handleClose (e) {
    console.log('close', e)
  }
  function handleError (e) {
    console.log('error', e)
  }
  init()
  return ws
}

export default useWebSocket
