window.onload = function() {
    createHearts();
};

function createHearts() {
    const heartContainer = document.getElementById('heart-container');
    for (let i = 0; i < 50; i++) {
        let heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.width = '30px';
        heart.style.height = '30px';
        heart.style.position = 'absolute';

        heart.style.left = Math.random() * (window.innerWidth - 30) + 'px'; 
        heart.style.top = Math.random() * (window.innerHeight - 30) + 'px'; 
        
        heart.style.background = 'url("heart.png") no-repeat center center';
        heart.style.backgroundSize = 'cover';

        heartContainer.appendChild(heart);
        animateHeart(heart);
    }
}

function animateHeart(heart) {
    const container = document.getElementById('heart-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const heartSize = 30;

    let posX = parseFloat(heart.style.left);
    let posY = parseFloat(heart.style.top);
    let velocityX = (Math.random() - 0.5) * 2;
    let velocityY = (Math.random() - 0.5) * 2;

    function move() {
        posX += velocityX;
        posY += velocityY;

        if (posX <= 0 || posX >= containerWidth - heartSize) {
            velocityX *= -1;
        }
        if (posY <= 0 || posY >= containerHeight - heartSize) {
            velocityY *= -1;
        }

        heart.style.left = posX + 'px';
        heart.style.top = posY + 'px';
        requestAnimationFrame(move);
    }

    move();
}

document.getElementById('yes-btn').addEventListener('click', function() {
    document.getElementById('response').innerHTML = '<p>Я радий, що ти погодилася! ❤️</p>';
    sendTelegramNotification('yes');

    const karinaImg = document.getElementById('karina-img');
    const doroshImg = document.getElementById('dorosh-img');
    const pocImg = document.getElementById('poc-img');

    karinaImg.classList.remove('hidden');
    doroshImg.classList.remove('hidden');

    // Анимация сближения изображений
    setTimeout(() => {
        karinaImg.style.transform = 'translate(-50px, 0)'; // Сдвиг влево
        doroshImg.style.transform = 'translate(50px, 0)'; // Сдвиг вправо

        // Показываем poc.png
        setTimeout(() => {
            pocImg.classList.remove('hidden');
            pocImg.style.opacity = 1;
            pocImg.style.transform = 'translate(0, 0)'; // Сближаем с центром
        }, 2000);
    }, 100);
});

document.getElementById('no-btn').addEventListener('click', function() {
    document.getElementById('response').innerHTML = '<p>Та йди ти нахуй.</p>';
    sendTelegramNotification('no');
});

function sendTelegramNotification(response) {
    const apiUrl = `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`;
    const chatId = '<YOUR_CHAT_ID>';
    const message = response === 'yes' ? 'Каріночка ЗГОДНА зустрічатись з тобою + !' : 'Кнопка "Ні" була натиснута :(!';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chat_id: chatId, text: message }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
