// Edit this array to change or add memories
const questions = [
    {
        question: 'Where did we share our first long late-night chat?',
        options: ['On a video call', 'In a quiet cafe', 'Through long voice notes'],
        answer: 0,
        correctMessage: 'Yes! I still feel that sparkle from our first calls.',
        wrongMessage: 'Aww, sweet guess. I’ll tell you after this one.'
    },
    {
        question: 'What is the first movie did we watched together ',
        options: ['Avatar Fire & Ash', 'Predator Badlands', 'Now you see me 3'],
        answer: 1,
        correctMessage: 'Exactly. That movie honestly brought us closer and more connected.',
        wrongMessage: 'Close! Don’t worry I know you knew the answer.'
    },
    {
        question: 'Which little thing of yours do I adore the most?',
        options: ['Your laugh', 'Your smile', 'Your hugs'],
        answer: 2,
        correctMessage: 'Yes, your hugs gives me warmth, security and that missing love I been yearning for.',
        wrongMessage: 'All of them, honestly. But your Hugs wins today.'
    },
    {
        question: 'Our sweetest habit together is...',
        options: ['Checking in before bed', 'Sending surprise selfies', 'Dreaming about future trips'],
        answer: 0,
        correctMessage: 'Always. Falling asleep close to you feels perfect even through the phone.',
        wrongMessage: 'That’s such a cute answer too. I still love our bedtime check-ins most.'
    },
    {
        question: 'What’s my favorite way to spoil you?',
        options: ['Little love notes', 'Warm compliments', 'All of the above'],
        answer: 2,
        correctMessage: 'Yes, all of it for you.',
        wrongMessage: 'The truth is all of it, always.'
    },

    {
        question: 'What’s the one thing I want to do with you the most?',
        options: ['Travel the world together', 'Build a cozy home', 'Grow old together'],
        answer: 2,
        correctMessage: 'Exactly. Growing old with you is my dream.',
        wrongMessage: 'All of those are true, but growing old together is the one I want most.'
    },

    {
        question: 'What’s the one thing I enjoy doing with you most?',
        options: ['Smoking together', 'Sharing our interests, passions and lives together', 'Just being with you'],
        answer: 2,
        correctMessage: 'Yes, just being with you is my favorite thing.',
        wrongMessage: 'All of those are wonderful and perfect, but just being with you is what I cherish most.'
    },

    {
        question: 'What’s the one thing I want to give you the most?',
        options: ['Endless love and affection', 'A lifetime of happiness and support', 'All of the above'],
        answer: 2, 
        correctMessage: 'Yes, all of that and more for you.',
        wrongMessage: 'The truth is all of it, always.'
    },

    {
        question: 'What’s the one thing I want to do for you the most?',
        options: ['Make you laugh every day', 'Be your rock through thick and thin', 'Give you the world', 'Be the light in your dark', 'All of the above'],
        answer: 4,
        correctMessage: 'Yes, all of that and more for you.',
        wrongMessage: 'The truth is all of it, always.'
    },

    {
        question: 'What’s the one place we planned on going to?',
        options: ['Paris', 'Tokyo', 'Bali', 'Thailand', 'Miami'],
        answer: 3,
        correctMessage: 'Yes, I can’t wait to explore Thailand with you.',
        wrongMessage: 'All of those are amazing places we will go to, but Thailand is the one I’m most excited about with you.'
    },

    {
        question: 'What is the difference between our relationship compared to others?(Nothing can compare to us)',
        options: ['Our deep emotional connection', 'Our unwavering support for each other', 'We don’t let our differences divide us', 'All of the above'],
        answer: 3,
        correctMessage: 'Yes, all of that and more makes us so special.',
        wrongMessage: 'The truth is all of it, always.'
    },    

    {
        question: 'When did I ever start falling in love with you?',
        options: ['From the moment we met', 'During our first deep conversation', 'When I realized how much I cared about you', 'All of the above'],
        answer: 0,
        correctMessage: 'Yes, all of that and more made me fall in love with you.',
        wrongMessage: 'When you pulled me to the side to go outside and take a breather but also gotten to know me, and then everything else more.'
    },

    {
        question: 'Where were we when I officially asked you to be my girlfreind?',
        options: ['At the park', 'On a video call', 'At Emperors Palace', 'Through a heartfelt message'],
        answer: 2,
        correctMessage: 'Yes, that day at Emperors Palace was so special and unforgettable.',
        wrongMessage: 'That day at Emperors Palace was so special and unforgettable.'
    },

    {
        question: 'What’s the one thing I enjoy doing and giving to you?',
        options: ['Taking you out', 'Eating you out', 'Giving you massages', 'Surprising you with little gifts', 'All of the above'],
        answer: 4,
        correctMessage: 'Yes, all of that and more for you. By the way, I can’t wait to eat you out again and again and again, and let me give you more massages baba.',
        wrongMessage: 'The truth is all of it, always and plenty.'
    },

    {
        question: 'How many times would I retry with you?',
        options: ['Once', 'Twice', 'Thrice', 'As many times as it takes', 'Forever'],
        answer: 4,
        correctMessage: 'Yes, forever and always for you, I will never give up.',
        wrongMessage: 'The truth is forever and always for you, I will never give up.'
    }

];

// Core UI references
const questionEl = document.getElementById('memory-question');
const optionsEl = document.getElementById('memory-options');
const feedbackEl = document.getElementById('memory-feedback');
const nextBtn = document.getElementById('memory-next');
const progressEl = document.getElementById('memory-progress');
const endEl = document.getElementById('memory-end');
const cardEl = document.getElementById('memory-card');
const restartBtn = document.getElementById('memory-restart');

let currentIndex = 0;
let answered = false;

function updateProgress() {
    progressEl.textContent = `${currentIndex + 1}/${questions.length}`;
}

// Render the current question and options
function renderQuestion() {
    const current = questions[currentIndex];
    answered = false;
    questionEl.textContent = current.question;
    feedbackEl.textContent = '';
    nextBtn.classList.add('hidden');
    optionsEl.innerHTML = '';

    updateProgress();

    current.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'memory-option';
        btn.textContent = option;
        btn.addEventListener('click', () => handleOption(index, btn));
        optionsEl.appendChild(btn);
    });
}

// Handle a choice and show loving feedback
function handleOption(index, button) {
    if (answered) return;
    answered = true;
    const current = questions[currentIndex];
    const correct = index === current.answer;

    Array.from(optionsEl.children).forEach((btn, btnIndex) => {
        btn.disabled = true;
        if (btnIndex === current.answer) {
            btn.classList.add('correct');
        }
    });

    button.classList.add(correct ? 'correct' : 'wrong');
    feedbackEl.textContent = correct ? current.correctMessage : current.wrongMessage;
    feedbackEl.classList.add('pop');
    feedbackEl.addEventListener('animationend', () => feedbackEl.classList.remove('pop'), { once: true });
    nextBtn.classList.remove('hidden');
}

function showEnd() {
    cardEl.classList.add('hidden');
    endEl.classList.remove('hidden');
}

function nextQuestion() {
    currentIndex += 1;
    if (currentIndex >= questions.length) {
        showEnd();
        return;
    }
    renderQuestion();
}

function restartGame() {
    currentIndex = 0;
    endEl.classList.add('hidden');
    cardEl.classList.remove('hidden');
    renderQuestion();
}

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartGame);

renderQuestion();
