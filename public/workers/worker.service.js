self.onmessage = e => {
  let i = 0
  setInterval(() => {
    self.postMessage(e.data.num + i)
    i++
  }, 7000)
}
