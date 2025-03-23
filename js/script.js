// js/script.js
// 模拟电影数据
const mockMovies = [
    {
        id: 1,
        title: "盗梦空间",
        genres: ["悬疑", "科幻"],
        poster_url: "images/inception.png",
        reason: "根据您近期喜爱的科幻电影推荐",
        description: "一名盗贼通过潜入他人梦境窃取信息，却陷入层层嵌套的梦境危机。",
        director: "克里斯托弗·诺兰",
        year: 2010
    },
    {
        id: 2,
        title: "阿凡达",
        genres: ["动作", "冒险"],
        poster_url: "images/avatar.png",
        reason: "热门高评分电影",
        description: "人类为获取资源入侵潘多拉星球，与纳美族人展开生存之战。",
        director: "詹姆斯·卡梅隆",
        year: 2009
    },
    {
        id: 3,
        title: "泰坦尼克号",
        genres: ["爱情", "灾难"],
        poster_url: "images/titanic.png",
        reason: "经典爱情电影",
        description: "穷画家杰克与贵族少女露丝在沉船事故中的生死之恋。",
        director: "詹姆斯·卡梅隆",
        year: 1997
    }
];

// 初始化页面时渲染电影列表
function renderMovies() {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = mockMovies.map(movie => `
        <div class="movie-card">
            <a href="movie_detail.html?id=${movie.id}">
                <img src="${movie.poster_url}" alt="${movie.title}">
            </a>
            <div class="movie-info">
                <h3><a href="movie_detail.html?id=${movie.id}">${movie.title}</a></h3>
                <p>类型: ${movie.genres.join(', ')}</p>
                <p>推荐理由: ${movie.reason}</p>
            </div>
        </div>
    `).join('');
}

// 模拟评分功能
function renderMovies() {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = mockMovies.map(movie => `
        <div class="movie-card">
            <a href="movie_detail.html?id=${movie.id}">
                <img src="${movie.poster_url}" alt="${movie.title}">
            </a>
            <div class="movie-info">
                <h3><a href="movie_detail.html?id=${movie.id}">${movie.title}</a></h3>
                <p>类型: ${movie.genres.join(', ')}</p>
                <p>推荐理由: ${movie.reason}</p>
                <!-- 新增评分模块 -->
                <div class="stars">
                    ${[1, 2, 3, 4, 5].map(i => `
                        <span class="star" onclick="rateMovie(${movie.id}, ${i})">★</span>
                    `).join('')}
                </div>
                <p class="rating-hint" id="rating-${movie.id}"></p>
            </div>
        </div>
    `).join('');
}

// 评分功能（保存到本地）
function rateMovie(movieId, rating) {
    localStorage.setItem(`movie_${movieId}_rating`, rating);
    document.getElementById(`rating-${movieId}`).textContent = `您的评分: ${'★'.repeat(rating)}`;
}


// 重置所有评分
function resetRatings() {
    // 遍历所有 localStorage 键
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('movie_')) {
            localStorage.removeItem(key);
        }
    });
    alert('已重置所有评分！');
    // 重新渲染电影列表以更新显示
    renderMovies();
}



// 硬编码的账号密码（明文存储，仅用于演示）
const validUsers = [
    { username: "u1", password: "1234" },
    { username: "u2", password: "1234" }
];

// 打开登录模态框
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

// 关闭登录模态框
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginError').textContent = '';
}

// 处理登录提交
function handleLogin(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const username = usernameInput.value;
    const password = passwordInput.value;

    // 验证账号密码
    const isValid = validUsers.some(user =>
        user.username === username && user.password === password
    );

    if (isValid) {
        // 登录成功逻辑
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        closeLoginModal();
        updateLoginStatus();
        showSuccessMessage('登录成功！'); // 显示成功提示
    } else {
        // 登录失败：清空输入框并显示错误
        usernameInput.value = '';
        passwordInput.value = '';
        document.getElementById('loginError').textContent = '账号或密码错误！';
    }
}

// 显示成功提示（持续3秒）
function showSuccessMessage(message) {
    const messageBox = document.createElement('div');
    messageBox.className = 'success-message';
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, 3000);
}

// 更新导航栏登录状态
function updateLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('currentUser');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (isLoggedIn) {
        // 登录状态：显示退出按钮，隐藏登录按钮
        document.getElementById('username').textContent = `用户: ${username}`;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        // 未登录状态：显示登录按钮，隐藏退出按钮
        document.getElementById('username').textContent = '未登录用户';
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}




function logout() {
    // 清除登录状态
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');

    // 新增：清空登录输入框内容
    document.getElementById('usernameInput').value = '';
    document.getElementById('passwordInput').value = '';

    // 更新界面状态
    updateLoginStatus();
    showSuccessMessage('已退出登录！');
}



// 页面加载完成后初始化
window.onload = function () {
    // 强制清空输入框
    document.getElementById('usernameInput').value = '';
    document.getElementById('passwordInput').value = '';

    // 更新登录状态和渲染电影
    updateLoginStatus();
    renderMovies();
};