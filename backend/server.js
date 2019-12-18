const WebSocket = require('ws')

const wss = new WebSocket.Server({ 
    port: process.env.WS_PORT || 8000 
})

wss.on('connection', ws => {
  ws.on('message', data => {
      console.log(data)
    wss.clients.forEach(client => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(data);
    //   }
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})
