window.onload = function() {
    // Генерация сердечек сразу при загрузке
    createHearts();
};

function createHearts() {
    const heartContainer = document.getElementById('heart-container');
    for (let i = 0; i < 50; i++) {
        let heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.width = '30px'; // Устанавливаем ширину и высоту
        heart.style.height = '30px';
        heart.style.position = 'absolute';

        // Случайное начальное положение
        heart.style.left = Math.random() * (window.innerWidth - 30) + 'px'; 
        heart.style.top = Math.random() * (window.innerHeight - 30) + 'px'; 
        
        heart.style.background = 'url("heart.png") no-repeat center center';
        heart.style.backgroundSize = 'cover';

        heartContainer.appendChild(heart);

        // Анимация сердечка
        animateHeart(heart);
    }
}

function animateHeart(heart) {
    const container = document.getElementById('heart-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const heartSize = 30; // Размер изображения сердечка

    let posX = parseFloat(heart.style.left);
    let posY = parseFloat(heart.style.top);
    let velocityX = (Math.random() - 0.5) * 2;
    let velocityY = (Math.random() - 0.5) * 2;

    function move() {
        posX += velocityX;
        posY += velocityY;

        // Проверка на столкновение с краями контейнера
        if (posX <= 0 || posX >= containerWidth - heartSize) {
            velocityX *= -1; // Изменение направления
        }
        if (posY <= 0 || posY >= containerHeight - heartSize) {
            velocityY *= -1; // Изменение направления
        }

        heart.style.left = posX + 'px';
        heart.style.top = posY + 'px';

        requestAnimationFrame(move);
    }

    move();
}

document.getElementById('yes-btn').addEventListener('click', function() {
    document.getElementById('response').innerHTML = '<p>Я радий, що ти погодилася! ❤️</p>';
    document.getElementById('yes-btn').style.backgroundColor = '#218838';
    document.getElementById('yes-btn').style.transform = 'scale(1.1)';
    sendTelegramNotification('yes');

    // Показ и анимация изображений
    const karinaImg = document.getElementById('karina-img');
    const doroshImg = document.getElementById('dorosh-img');
    const pocImg = document.getElementById('poc-img');

    karinaImg.classList.remove('hidden');
    doroshImg.classList.remove('hidden');

    // Анимация сближения изображений
    setTimeout(() => {
        karinaImg.style.transform = 'translate(-100px, 0)'; // Перемещаем влево к центру
        doroshImg.style.transform = 'translate(100px, 0)'; // Перемещаем вправо к центру

        // Показываем изображение poc.png, когда два других изображения стоят рядом
        setTimeout(() => {
            pocImg.classList.remove('hidden');
            pocImg.style.opacity = 1; // Показываем изображение
        }, 2000); // Задержка для эффекта анимации
    }, 100); // Небольшая задержка для эффекта анимации
});

document.getElementById('no-btn').addEventListener('click', function() {
    document.getElementById('response').innerHTML = '<p>Та йди ти нахуй.</p>';
    document.getElementById('no-btn').style.backgroundColor = '#dc3545';
    document.getElementById('no-btn').style.transform = 'scale(1.1)';
    sendTelegramNotification('no');
});

function sendTelegramNotification(response) {
    const apiUrl = `https://api.telegram.org/bot7392052440:AAFeYgwQSAZh7-2GbuU4-1mCScfjsQzvbVM/sendMessage`;
    const chatId = '6607362264';
    const message = response === 'yes' ? 'Каріночка ЗГОДНА зустрічатись з тобою + !' : 'Кнопка "Ні" була натиснута :(!';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
