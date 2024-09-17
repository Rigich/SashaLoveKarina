window.onload = function() {
    // Generate hearts immediately
    createHearts();
};

function createHearts() {
    const heartContainer = document.getElementById('heart-container');
    for (let i = 0; i < 50; i++) {
        let heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.width = '30px'; // Set width and height
        heart.style.height = '30px';
        heart.style.position = 'absolute';

        // Random initial position
        heart.style.left = Math.random() * (window.innerWidth - 30) + 'px'; 
        heart.style.top = Math.random() * (window.innerHeight - 30) + 'px'; 
        
        heart.style.background = 'url("heart.png") no-repeat center center';
        heart.style.backgroundSize = 'cover';

        heartContainer.appendChild(heart);

        // Animate heart
        animateHeart(heart);
    }
}

function animateHeart(heart) {
    const container = document.getElementById('heart-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const heartSize = 30; // Size of the heart image

    let posX = parseFloat(heart.style.left);
    let posY = parseFloat(heart.style.top);
    let velocityX = (Math.random() - 0.5) * 2;
    let velocityY = (Math.random() - 0.5) * 2;

    function move() {
        posX += velocityX;
        posY += velocityY;

        // Check for collision with container edges
        if (posX <= 0 || posX >= containerWidth - heartSize) {
            velocityX *= -1; // Reverse direction
        }
        if (posY <= 0 || posY >= containerHeight - heartSize) {
            velocityY *= -1; // Reverse direction
        }

        heart.style.left = posX + 'px';
        heart.style.top = posY + 'px';

        requestAnimationFrame(move);
    }

    move();
}

document.getElementById('yes-btn').addEventListener('click', function() {
    document.getElementById('response').innerHTML = '<p>Я радий, що ти погодилася! ❤️</p>';
    document.getElementById('kiss-container').style.display = 'flex'; // Show kiss images
    document.getElementById('yes-btn').style.backgroundColor = '#218838';
    document.getElementById('yes-btn').style.transform = 'scale(1.1)';
});

document.getElementById('no-btn').addEventListener('click', function() {
    document.getElementById('response').innerHTML = '<p>Та йди ти нахуй.</p>';
    document.getElementById('no-btn').style.backgroundColor = '#dc3545';
    document.getElementById('no-btn').style.transform = 'scale(1.1)';
});
