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
'You’re cherished more than you know.',
'You matter so much to me.',
'You are never alone in this life.',
'Your smile fixes heavy days.',
'I admire your strength.',
'You are deeply appreciated.',
'You deserve gentle love.',
'I believe in you completely.',
'You are more than enough.',
'I choose you every time.',
'Your laugh is my favorite sound.',
'I’m grateful for your existence.',
'You bring light into my life.',
'You are seen and understood.',
'I treasure your heart.',
'You inspire me.',
'You are my peace.',
'I adore the way you think.',
'You are safe to be yourself.',
'Your presence calms me.',
'I love how your mind works.',
'You are irreplaceable.',
'I’m thankful for you today.',
'You make ordinary days special.',
'You are my soft place to land.',
'I’m here for you always.',
'You are stronger than you feel.',
'I care about your dreams.',
'You are valued beyond words.',
'I respect your heart.',
'You are deeply loved.',
'I’m proud of who you are becoming.',
'You make life warmer.',
'You are beautifully unique.',
'I appreciate your kindness.',
'You are important to me.',
'I’m lucky to know you.',
'You deserve peace.',
'Your feelings matter.',
'I will always support you.',
'You are my comfort.',
'You are growing beautifully.',
'I trust you.',
'You are radiant.',
'I love your gentle spirit.',
'You are a blessing in my life.',
'I admire your resilience.',
'You are thoughtfully loved.',
'I feel safe with you too.',
'You are my favorite person.',
'I’m proud of your effort.',
'You are worth celebrating.',
'Your heart is golden.',
'I’m grateful for your love.',
'You are a beautiful soul.',
'You deserve slow mornings and soft nights.',
'You are precious to me.',
'I admire your courage.',
'You bring calm to chaos.',
'You are constantly on my mind.',
'I value your honesty.',
'You make my heart steady.',
'You are magic in human form.',
'I love how you care.',
'You are tender and strong.',
'I believe in your dreams.',
'You are my quiet joy.',
'I adore your smile.',
'You are always welcome here.',
'I cherish our memories.',
'You are thoughtful and kind.',
'I am here through everything.',
'You deserve kindness.',
'You make love feel easy.',
'You are beautifully human.',
'I see your effort.',
'You are my warmth.',
'You are appreciated deeply.',
'I love your presence.',
'You deserve to rest.',
'You are my happiness.',
'I’m grateful we met.',
'You are safe in my arms.',
'I respect your journey.',
'You are more capable than you know.',
'I love your honesty.',
'You make my heart lighter.',
'You deserve to feel secure.',
'You are my favorite hello.',
'I’m thankful for your heart.',
'You are deeply valued.',
'I admire your softness.',
'You are my steady place.',
'I’m here without conditions.',
'You are worthy of love.',
'I’m always rooting for you.',
'You are beautifully strong.',
'I treasure your smile.',
'You are my daily gratitude.',
'I love the way you care.',
'You are my calm.',
'I appreciate your patience.',
'You are safe with your feelings.',
'I adore your soul.',
'You are growing in beautiful ways.',
'I love how you try.',
'You are never too much.',
'I cherish you.',
'You are my gentle reminder of love.',
'I admire your heart.',
'You are my comfort zone.',
'I love your warmth.',
'You are cherished endlessly.',
'I’m proud of your progress.',
'You deserve steady love.',
'You are safe in my world.',
'I’m grateful for your trust.',
'You are my soft smile.',
'I respect your strength.',
'You are beautifully resilient.',
'I love your quiet moments.',
'You are my light.',
'I’m here even on hard days.',
'You deserve reassurance.',
'You are my heartbeat.',
'I admire your honesty.',
'You are always enough.',
'I treasure your thoughts.',
'You are my sunshine on quiet days.',
'I appreciate your bravery.',
'You are deeply supported.',
'I love your depth.',
'You are safe to rest.',
'I’m thankful for your patience.',
'You are beautifully gentle.',
'I love your heart.',
'You deserve to feel chosen.',
'You are my peace of mind.',
'I admire your growth.',
'You are so meaningful to me.',
'I love your presence.',
'You are deeply important.',
'I cherish your existence.',
'You are my warmth in winter.',
'I’m proud of your strength.',
'You are safe and protected.',
'I value every moment with you.',
'You are beautifully you.',
'I love how you shine.',
'You deserve soft love.',
'You are my happiness.',
'I admire your spirit.',
'You are endlessly appreciated.',
'I love the way you love.',
'You are my steady calm.',
'I cherish our bond.',
'You are worthy every day.',
'I’m grateful for your smile.',
'You are my safe place.',
'I love your honesty.',
'You are supported fully.',
'I admire your kindness.',
'You are deeply respected.',
'I love how you grow.',
'You are treasured.',
'I’m proud to love you.',
'You are beautifully strong and soft.',
'I value your heart.',
'You are my favorite thought.',
'I love your patience.',
'You are enough right now.',
'I cherish your dreams.',
'You are safe to be vulnerable.',
'I admire your resilience.',
'You are my daily joy.',
'I love your warmth.',
'You are completely loved.',
'I’m here for the long run.',
'You are never alone.',
'I cherish you deeply.',
'You are my forever comfort.'
];


// Special milestone messages
const milestones = {
    10: 'Ten taps, ten hugs. I’m wrapped around you.',
    25: 'Twenty-five taps of love. You’re my calm.',
    50: 'Fifty taps! A whole sky of love just for you.',
    75: 'Seventy-five taps… my heart keeps choosing you.',
    100: 'One hundred taps. That’s one hundred reasons I adore you.',
    150: 'One hundred fifty taps. You really love being loved, don’t you?',
    200: 'Two hundred taps. That’s devotion. And I’m devoted to you.'
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
