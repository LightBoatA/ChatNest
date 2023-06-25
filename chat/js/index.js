// 获取消息
// 获取用户名

const oMessage = document.querySelector('#input');
const oBtn = document.querySelector('#send');
const oList = document.querySelector('#list');
const username = localStorage.getItem('username');
const color = JSON.parse(localStorage.getItem('color')); // 每个用户的颜色信息
const photo = localStorage.getItem('photo');

// 生成随机气泡颜色
// const color = generateRandomLightColor();

// 创建 WebSocket 连接
const ws = new WebSocket('ws://localhost:8080');

function init () {
    bindEvent();
}

function bindEvent() {
    oBtn.addEventListener('click', handleSendBtnClick,false);
    oMessage.addEventListener('keyup', handleInputEnd, false);
    ws.addEventListener('open',handleOpen,false);
    ws.addEventListener('close',handleClose,false);
    ws.addEventListener('error',handleError,false);
    ws.addEventListener('message',handleMessage,false);

}
function handleInputEnd(e) {
    if (e.key === 'Enter') {
        handleSendBtnClick();
    }
}
function handleSendBtnClick() {
    const msg = oMessage.value.trim();
    if (!msg) {
        return;
    }
    // 发送消息
    ws.send(JSON.stringify({
        user: username,
        dateTime: new Date().getTime(),
        message: msg,
        color:color,
        photo,
    }));

    // 清空文本框内容
    oMessage.value = '';
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
function handleMessage(e) {
    console.log('WebSocket message', e);
    // 接收服务端的消息
    const msgData = JSON.parse(e.data);
    const liElement = createMsgLi(msgData);
    oList.appendChild(liElement);
    liElement.scrollIntoView();// 使新发的消息显示在视窗（滚动条定位到最底端）
}

function createMsgLi(data) {
    const {user, dateTime, message, color, photo} = data;
    const oItem = document.createElement('li');

    // 创建一个Image对象
    // const image = new Image();
    // image.onload = function () {
    //     oItem.appendChild(image);
    // }
    // image.src = 

    console.log(photo);
    // <div class="photo" style="background:${color.darkColor}"></div>
    oItem.innerHTML = `
        <img class="photo" src="${photo}"/>
        <div class="content">
            <p class="username" style="color:${color.darkColor}">
                <span class="name">${ user}</span>
                <span>${ formatDateTime(new Date(dateTime)) }</span>
            </p>
            <p class="chat-bubble" style="background:${color.lightColor}">${ message }</p>
        </div>
    `;
    return oItem;
}
// 工具函数

function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

init();