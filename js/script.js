// --- HEART CANVAS ANIMATION ---
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Heart {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 15 + 10;
        this.speedY = Math.random() * 1.5 + 0.8;
        this.speedX = Math.sin(this.y * 0.01) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.symbol = ['❤️', '💖', '✨', '🌸', '💕'][Math.floor(Math.random() * 5)];
    }
    update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.y * 0.02) * 0.8;
        if (this.y < -30) this.reset();
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px sans-serif`;
        ctx.fillText(this.symbol, this.x, this.y);
    }
}

const hearts = Array.from({ length: 25 }, () => new Heart());

function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
        h.update();
        h.draw();
    });
    requestAnimationFrame(animateHearts);
}
animateHearts();

// --- MUSIC PLAYER ---
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
    } else {
        bgMusic.play().then(() => {
            musicBtn.classList.add('playing');
        }).catch(err => console.log('Autoplay blocked:', err));
    }
    isPlaying = !isPlaying;
}

// --- OPEN ENVELOPE ---
function openEnvelope() {
    const envelopeScreen = document.getElementById('envelopeScreen');
    const flap = envelopeScreen.querySelector('.flap');
    const letter = envelopeScreen.querySelector('.letter-preview');
    const seal = envelopeScreen.querySelector('.heart-seal');

    // Thử bật nhạc khi click mở thư
    if (!isPlaying) {
        toggleMusic();
    }

    seal.style.opacity = '0';
    flap.style.transform = 'rotateX(180deg)';

    setTimeout(() => {
        letter.style.transform = 'translateY(-100px)';
    }, 300);

    setTimeout(() => {
        envelopeScreen.style.display = 'none';
        document.getElementById('step1').classList.remove('hidden');
    }, 900);
}

// --- DODGE NO BUTTON ---
let scaleYes = 1;
let dodgeCount = 0;

const catNormalSVG = `
    <svg class="cute-cat" viewBox="0 0 200 200" width="150" height="150">
        <polygon points="40,70 25,25 80,45" fill="#ff758c"/>
        <polygon points="160,70 175,25 120,45" fill="#ff758c"/>
        <polygon points="45,65 33,33 75,47" fill="#ffb8c6"/>
        <polygon points="155,65 167,33 125,47" fill="#ffb8c6"/>
        <ellipse cx="100" cy="100" rx="70" ry="60" fill="#ffffff" stroke="#ff758c" stroke-width="4"/>
        <ellipse cx="60" cy="110" rx="12" ry="7" fill="#ffb8c6" opacity="0.8"/>
        <ellipse cx="140" cy="110" rx="12" ry="7" fill="#ffb8c6" opacity="0.8"/>
        <circle cx="70" cy="90" r="10" fill="#2f3542"/>
        <circle cx="130" cy="90" r="10" fill="#2f3542"/>
        <circle cx="73" cy="87" r="4" fill="#ffffff"/>
        <circle cx="133" cy="87" r="4" fill="#ffffff"/>
        <polygon points="96,102 104,102 100,107" fill="#ff4757"/>
        <path d="M 90 112 Q 100 120 100 112 Q 100 120 110 112" fill="none" stroke="#2f3542" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="80" cy="140" rx="14" ry="18" fill="#ffffff" stroke="#ff758c" stroke-width="3"/>
        <ellipse cx="120" cy="140" rx="14" ry="18" fill="#ffffff" stroke="#ff758c" stroke-width="3"/>
    </svg>
`;

const catSadSVG = `
    <svg class="cute-cat" viewBox="0 0 200 200" width="150" height="150">
        <polygon points="40,70 25,25 80,45" fill="#ff758c"/>
        <polygon points="160,70 175,25 120,45" fill="#ff758c"/>
        <polygon points="45,65 33,33 75,47" fill="#ffb8c6"/>
        <polygon points="155,65 167,33 125,47" fill="#ffb8c6"/>
        <ellipse cx="100" cy="100" rx="70" ry="60" fill="#ffffff" stroke="#ff758c" stroke-width="4"/>
        <path d="M 58 85 Q 70 95 82 85" fill="none" stroke="#2f3542" stroke-width="4" stroke-linecap="round"/>
        <path d="M 118 85 Q 130 95 142 85" fill="none" stroke="#2f3542" stroke-width="4" stroke-linecap="round"/>
        <path d="M 65 95 C 60 110 65 125 70 130 C 75 125 75 110 65 95 Z" fill="#70a1ff" opacity="0.9"/>
        <path d="M 135 95 C 130 110 135 125 140 130 C 145 125 145 110 135 95 Z" fill="#70a1ff" opacity="0.9"/>
        <polygon points="96,102 104,102 100,107" fill="#ff4757"/>
        <path d="M 90 120 Q 100 110 110 120" fill="none" stroke="#2f3542" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="80" cy="145" rx="14" ry="18" fill="#ffffff" stroke="#ff758c" stroke-width="3"/>
        <ellipse cx="120" cy="145" rx="14" ry="18" fill="#ffffff" stroke="#ff758c" stroke-width="3"/>
    </svg>
`;

function dodgeNo() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const box = document.getElementById('illustrationBox');

    dodgeCount++;

    // Đổi hình mèo khóc
    if (box) {
        box.innerHTML = catSadSVG;
    }

    // Phóng to nút "Đồng ý"
    scaleYes += 0.2;
    yesBtn.style.transform = `scale(${scaleYes})`;

    // Tính toán góc nhảy ngẫu nhiên không thoát màn hình
    const card = document.getElementById('step1');
    const cardRect = card.getBoundingClientRect();
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxX = cardRect.width / 2 - btnWidth;
    const maxY = cardRect.height / 2 - btnHeight;

    const randomX = (Math.random() * 2 - 1) * maxX;
    const randomY = (Math.random() * 2 - 1) * maxY;

    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// --- STEP NAVIGATION ---
function nextStep(step) {
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.add('hidden');

    document.getElementById('step' + step).classList.remove('hidden');
}

// --- MENU SELECTION ---
const dateSelection = {
    food: '🍲 Lẩu Thái chua cay',
    drink: '🧋 Trà sữa full topping',
    activity: '🛵 Lượn phố / Hồ Tây'
};

function selectOption(el, category) {
    const parent = el.parentElement;
    parent.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
    el.classList.add('selected');
    dateSelection[category] = el.innerText;
}

// --- CONFIRM DATE & SHOW TICKET ---
function confirmDate() {
    document.getElementById('summaryFood').innerText = dateSelection.food;
    document.getElementById('summaryDrink').innerText = dateSelection.drink;
    document.getElementById('summaryActivity').innerText = dateSelection.activity;

    nextStep(3);

    // Bắn Pháo hoa Celebration!
    confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
    });
}

// --- COPY PROOF TO CLIPBOARD ---
function copyProof() {
    const text = `✨ LỊCH HẸN TÌNH YÊU CHỐT KÈO ✨\n` +
        `- Món ăn: ${dateSelection.food}\n` +
        `- Đồ uống: ${dateSelection.drink}\n` +
        `- Đi đâu: ${dateSelection.activity}\n` +
        `- Thời gian: Tối Thứ 7 tuần này (19:00)\n` +
        `💖 Đã lưu bằng chứng rồi nha! Cấm bùng kèo 🥰`;

    navigator.clipboard.writeText(text).then(() => {
        alert('🎉 Đã sao chép bằng chứng! Giờ hãy gửi qua Zalo/Messenger cho anh nha ❤️');
    }).catch(() => {
        alert('Đã tạo bằng chứng thành công! Chúc hai bạn có buổi hẹn hò vui vẻ ❤️');
    });
}

// --- RESET ALL SELECTIONS ---
function resetAll() {
    dodgeCount = 0;
    scaleYes = 1;

    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const box = document.getElementById('illustrationBox');

    if (yesBtn) yesBtn.style.transform = 'scale(1)';
    if (noBtn) noBtn.style.transform = 'translate(0, 0)';
    if (box) box.innerHTML = catNormalSVG;

    // Reset selected options to default
    document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
    
    const foodCards = document.querySelectorAll('#foodOptions .option-card');
    const drinkCards = document.querySelectorAll('#drinkOptions .option-card');
    const activityCards = document.querySelectorAll('#activityOptions .option-card');

    if (foodCards.length > 0) foodCards[0].classList.add('selected');
    if (drinkCards.length > 0) drinkCards[0].classList.add('selected');
    if (activityCards.length > 0) activityCards[0].classList.add('selected');

    dateSelection.food = foodCards[0]?.innerText || '🍲 Lẩu Thái chua cay';
    dateSelection.drink = drinkCards[0]?.innerText || '🧋 Trà sữa full topping';
    dateSelection.activity = activityCards[0]?.innerText || '🛵 Lượn phố / Hồ Tây';

    // Back to Step 1
    nextStep(1);
}
