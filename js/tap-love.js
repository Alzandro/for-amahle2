// Tap-to-love game logic
const heartBtn = document.getElementById('tap-heart');
const countEl = document.getElementById('tap-count');
const messageEl = document.getElementById('tap-message');
const resetBtn = document.getElementById('tap-reset');

// Gentle rotating messages
const messages = [
    'I love you endlessly.',
    'You are safe with me.',
    'I’m proud of you, always.',
    'Your heart is my favorite place.',
    'You make my world softer.',
    'I’m cheering for you every day.',
    'You’re cherished more than you know.'
];

// Special milestone messages
const milestones = {
    10: 'Ten taps, ten hugs. I’m wrapped around you.',
    25: 'Twenty-five taps of love. You’re my calm.',
    50: 'Fifty taps! A whole sky of love just for you.'
};

let count = 0;

function updateMessage(text) {
    messageEl.textContent = text;
    messageEl.classList.add('pop');
    messageEl.addEventListener('animationend', () => messageEl.classList.remove('pop'), { once: true });
}

function handleTap() {
    count += 1;
    countEl.textContent = count.toString();

    if (milestones[count]) {
        updateMessage(milestones[count]);
        return;
    }

    const nextMessage = messages[Math.floor(Math.random() * messages.length)];
    updateMessage(nextMessage);

    heartBtn.classList.add('pop');
    heartBtn.addEventListener('animationend', () => heartBtn.classList.remove('pop'), { once: true });
}

function resetTaps() {
    count = 0;
    countEl.textContent = '0';
    updateMessage('I’m right here, always.');
}

heartBtn.addEventListener('click', handleTap);
resetBtn.addEventListener('click', resetTaps);
