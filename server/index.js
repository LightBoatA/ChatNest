const Ws = require('ws');

// 创建 WebSocket 服务器
const server = new Ws.Server({port: 8080});

function init () {
    bindEvent();
}

function bindEvent() {
    server.on('open', handleOpen);
    server.on('close', handleClose);
    server.on('error', handleError);
    
    server.on('connection', handleConnection);

}

function handleOpen(e) {
    console.log('WebSocket open', e);
}

function handleClose(e) {
    console.log('WebSocket close', e);
}
function handleError(e) {
    console.log('WebSocket error', e);
}
function handleConnection(ws) {
    console.log('WebSocket connection');
    ws.on('message', handleMessage);
}

function handleMessage(msg) {
    // 广播给每一个客户端
    const msgStr = JSON.stringify(JSON.parse(msg));
    server.clients.forEach(function (c) {
        c.send(msgStr);
    })
    // broadcastMessage(msg);
}

init();

