// 获取用户名，存入localStorage
// 跳转页面


const oUsername = document.querySelector(".user");
const oLoginBtn = document.querySelector(".login-btn");
// const oUploadBtn = document.querySelector(".upload-btn");
const oImageInput = document.querySelector("#image-input");
const oPhoto = document.querySelector("#photo");
const defaultPhotoSrc = './img/示例头像.png';

const init = () => {
    bindEvent();
}

function bindEvent () {
    window.addEventListener('load', handleWindowLoad, false);
    oLoginBtn.addEventListener('click', handleLoginBtnClick, false);
    // oUploadBtn.addEventListener('click', handleUploadBtnClick, false);
    oImageInput.addEventListener('change', handleImageInputChange, false);
    oUsername.addEventListener('keyup', handleUsernameInputEnd, false);
}

function handleWindowLoad () {
    console.log('清空storage');
    localStorage.clear();
    
}

function handleUsernameInputEnd (e) {
    if (e.key === 'Enter') {
        handleLoginBtnClick();
    }
}

function handleLoginBtnClick () {
    const username = oUsername.value.trim();

    if (username.length < 2) {
        alert('用户名不能小于2位');
        return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('color', JSON.stringify(generateRandomLightColor()));
    // 头像信息存储
    if (!localStorage.getItem('photo')) {
        localStorage.setItem('photo', defaultPhotoSrc);
    }
    location.href = 'index.html';
}

// 上传头像
function handleImageInputChange (e) {
    const file = e.target.files[0];

    console.log(file);
    if (file) {
        // 创建一个FileReader对象
        const reader = new FileReader();

        // 读取文件数据
        reader.readAsDataURL(file);
        // 读取文件数据完成的回调函数
        reader.onload = function () {
            const imageData = reader.result;

            // 前端显示图像
            oPhoto.src = imageData;
            // 存储到localStorage中
            localStorage.setItem('photo', imageData);
        }
    } else {
        localStorage.setItem('photo', defaultPhotoSrc);
    }

}

function handleUploadBtnClick () {
    // const fileInput = document.getElementById('file-input');
    // const file = fileInput.files[0]; // 获取选择的文件

    // const reader = new FileReader();
    // reader.onload = function(event) {
    //     const imageData = event.target.result; // 读取的图片数据

    //     // 将图片数据发送到 WebSocket 服务器    
    //     socket.send(imageData);
    // };
    // reader.readAsDataURL(file); // 以DataURL的形式读取文件内容
}


// 工具函数
function generateRandomLightColor() {
    // 生成随机浅颜色
    const min = 100;
    const max = 255;
    // 生成随机的红绿蓝值
    const r = Math.floor(Math.random() * (max - min) + min); 
    const g = Math.floor(Math.random() * (max - min) + min); 
    const b = Math.floor(Math.random() * (max - min) + min); 
  
    // 将 RGB 值组合成 CSS 格式的颜色字符串
    // const color = `rgb(${r}, ${g}, ${b})`;
    const lightColor = `rgb(${r}, ${g}, ${b})`;
    const k = 80;
    const darkColor = `rgb(${r-k}, ${g-k}, ${b-k})`;
  
    // return { lightColor, darkColor };
    return { lightColor: lightColor, darkColor: darkColor };
}
init();