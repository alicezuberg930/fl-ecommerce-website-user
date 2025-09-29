// Listen for messages from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'START') {
    let i = 0

    // Simulate periodic notifications
    const interval = setInterval(() => {
      self.registration.showNotification('Trạng thái đơn hàng', {
        body: `Đơn hàng ${event.data.num + i}`,
        icon: '/assets/rem2.png'
      })
      i++

      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage(`SW says: Counter is now "${event.data.num + i}"`)
        })
      })
    }, 8000)

    // Save interval ID to stop later
    self.interval = interval
  }

  if (event.data && event.data.type === 'STOP') {
    clearInterval(self.interval)
  }
})

// Required for notifications
// self.addEventListener('notificationclick', event => {
  // event.notification.close()
// })