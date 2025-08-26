const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 3000 });

console.log('🟢 Minecraft IRC Server started');

wss.on('connection', (ws) => {
    console.log('🔗 New client connected');
    
    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);
            
            // Просто пересылаем всем сообщения
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === 1) {
                    client.send(JSON.stringify(message));
                }
            });
            
        } catch (error) {
            console.log('❌ Error:', error);
        }
    });

    ws.on('close', () => {
        console.log('🔴 Client disconnected');
    });
});
