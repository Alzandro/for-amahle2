```js
// Valentine App JavaScript
// Handles passphrase gate, countdown logic, navigation, and interactive elements

const DEV_MODE = false; // 🔧 set to false before deployment

document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const PASSPHRASE = "18ALZ_XO_@Mahl3!25";
    const VALENTINE_DATE = new Date('2026-02-14T00:00:00+02:00'); // Feb 14 SAST

    // DOM Elements
    const gate = document.getElementById('gate');
    const countdown = document.getElementById('countdown');
    const app = document.getElementById('app');
    const passphraseInput = document.getElementById('passphrase-input');
    const submitPassphrase = document.getElementById('submit-passphrase');
    const retryMessage = document.getElementById('retry-message');
    const beginBtn = document.getElementById('begin-btn');
    const nav = document.getElementById('nav');
    const navBtns = document.querySelectorAll('.nav-btn');
    const finalBtns = document.querySelectorAll('#yes-updates, #no-updates');
    const finalMessage = document.getElementById('final-message');

    // Initialize app
    initApp();

    function initApp() {
        if (sessionStorage.getItem('passphraseEntered')) {
            showApp();
        } else {
            setupPassphraseGate();
        }
    }

    function setupPassphraseGate() {
        submitPassphrase.addEventListener('click', checkPassphrase);
        passphraseInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassphrase();
            }
        });
    }

    function checkPassphrase() {
        const answer = passphraseInput.value.trim();
        if (answer === PASSPHRASE) {
            sessionStorage.setItem('passphraseEntered', 'true');
            showApp();
        } else {
            showRetryMessage();
        }
    }

    function showRetryMessage() {
        retryMessage.classList.remove('hidden');
        passphraseInput.value = '';
        passphraseInput.focus();
        setTimeout(() => {
            retryMessage.classList.add('hidden');
        }, 3000);
    }

    function showApp() {
        gate.classList.add('hidden');
        checkDateAndShowContent();
    }

    function checkDateAndShowContent() {
        const now = new Date();
        const nowSAST = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Johannesburg" }));

        if (nowSAST >= VALENTINE_DATE) {
            app.classList.remove('hidden');
            setupWelcome();
        } else {
            countdown.classList.remove('hidden');
            startCountdown();
        }
    }

    function startCountdown() {
        function updateCountdown() {
            const now = new Date();
            const nowSAST = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Johannesburg" }));
            let timeLeft = VALENTINE_DATE - nowSAST;

            if (DEV_MODE) {
                timeLeft = 0;
            }

            if (timeLeft <= 0) {
                if (!DEV_MODE) {
                    countdown.classList.add('hidden');
                }
                app.classList.remove('hidden');
                setupWelcome();
                if (!DEV_MODE) return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
        setupLimitedPreview();
    }

    function setupLimitedPreview() {
        const showPhotoBtn = document.getElementById('show-photo');
        const photoPreview = document.getElementById('photo-preview');
        const showAudioBtn = document.getElementById('show-audio');
        const audioPreview = document.getElementById('audio-preview');
        const audio = audioPreview ? audioPreview.querySelector('audio') : null;
        const showLetterBtn = document.getElementById('show-letter');
        const letterPreview = document.getElementById('letter-preview');

        showPhotoBtn.addEventListener('click', () => {
            togglePreview(photoPreview);
        });

        showAudioBtn.addEventListener('click', () => {
            togglePreview(audioPreview);

            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(() => {});
            }
        });

        showLetterBtn.addEventListener('click', () => {
            togglePreview(letterPreview);
        });
    }

    function togglePreview(previewElement) {
        const isHidden = previewElement.classList.contains('hidden');

        document.querySelectorAll('.preview-content').forEach(el => {
            el.classList.add('hidden');

            const aud = el.querySelector('audio');
            if (aud) {
                aud.pause();
                aud.currentTime = 0;
            }
        });

        if (isHidden) {
            previewElement.classList.remove('hidden');
        }
    }

    function setupWelcome() {
        beginBtn.addEventListener('click', function () {
            window.location.href = "nav.html";
        });
    }

    function showSection(sectionName) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });

        document.getElementById(sectionName).classList.remove('hidden');

        navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionName) {
                btn.classList.add('active');
            }
        });
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showSection(this.dataset.section);
        });
    }

    function loadContent() {
        loadTimeline();
        loadLetters();
        loadMusic();
        loadGames();
        setupFinalQuestion();
    }

    function loadTimeline() {
        const timelineContainer = document.querySelector('.timeline-container');

        const memories = [
            { type: 'image', src: 'assets/images/memory1.jpg', date: 'January 15, 2024', caption: 'Our first adventure together...' },
            { type: 'video', src: 'assets/video/memory1.mp4', date: 'February 14, 2024', caption: 'Happy Valentine\'s Day, my love!' },
            { type: 'image', src: 'assets/images/memory2.jpg', date: 'March 10, 2024', caption: 'A beautiful sunset we shared...' }
        ];

        memories.forEach(memory => {
            const card = document.createElement('div');
            card.className = 'memory-card';

            const mediaElement = memory.type === 'image'
                ? `<img src="${memory.src}" alt="Memory" loading="lazy">`
                : `<video controls playsinline><source src="${memory.src}" type="video/mp4"></video>`;

            card.innerHTML = `
                ${mediaElement}
                <div class="memory-content">
                    <div class="memory-date">${memory.date}</div>
                    <div class="memory-caption">${memory.caption}</div>
                </div>
            `;

            timelineContainer.appendChild(card);
        });
    }

    function loadLetters() {
        const lettersContainer = document.querySelector('.letters-container');

        const letters = [
            { content: `My Dearest Love,\n\nEvery moment with you feels like a beautiful dream I never want to wake from.\n\nForever yours,\nWith all my heart` },
            { content: `My Love,\n\nIn your eyes, I see my future.\n\nEternally yours` }
        ];

        letters.forEach(letter => {
            const card = document.createElement('div');
            card.className = 'letter-card';
            card.innerHTML = `<div class="letter-content">${letter.content}</div>`;
            lettersContainer.appendChild(card);
        });
    }

    function loadMusic() {
        const musicContainer = document.querySelector('.music-container');

        const songs = [
            { src: 'assets/audio/song1.mp3', caption: '"Our Song"' },
            { src: 'assets/audio/song2.mp3', caption: '"Forever"' }
        ];

        songs.forEach(song => {
            const card = document.createElement('div');
            card.className = 'music-card';
            card.innerHTML = `
                <audio class="music-player" controls playsinline preload="metadata">
                    <source src="${song.src}" type="audio/mpeg">
                </audio>
                <div class="music-caption">${song.caption}</div>
            `;
            musicContainer.appendChild(card);
        });
    }

    function loadGames() {
        const gamesContainer = document.querySelector('.games-container');

        gamesContainer.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-question">What's my favorite thing about you?</div>
                <div class="quiz-options">
                    <button class="quiz-option" data-answer="wrong">Your smile</button>
                    <button class="quiz-option" data-answer="wrong">Your laugh</button>
                    <button class="quiz-option" data-answer="correct">Everything</button>
                    <button class="quiz-option" data-answer="wrong">Your eyes</button>
                </div>
                <div class="quiz-feedback"></div>
            </div>
        `;

        const quizOptions = document.querySelectorAll('.quiz-option');
        const quizFeedback = document.querySelector('.quiz-feedback');

        quizOptions.forEach(option => {
            option.addEventListener('click', function() {
                quizFeedback.textContent =
                    this.dataset.answer === 'correct'
                        ? 'Correct! You know me so well! ❤️'
                        : 'Nice try, but I love everything about you! 💕';
            });
        });
    }

    function setupFinalQuestion() {
        finalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                finalMessage.textContent =
                    this.id === 'yes-updates'
                        ? 'Wonderful! Our story continues to grow... 💕'
                        : 'Too bad. Updates already running in the background. 😉';
                finalMessage.classList.remove('hidden');
            });
        });
    }
});

document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('.timeline-item');
        const mediaContainer = item.querySelector('.media-container');
        const media = mediaContainer.querySelector('img, video');

        const isOpen = !mediaContainer.classList.contains('hidden');

        document.querySelectorAll('.media-container').forEach(container => {
            container.classList.add('hidden');
            const vid = container.querySelector('video');
            if (vid) {
                vid.pause();
                vid.currentTime = 0;
            }
        });

        if (!isOpen) {
            mediaContainer.classList.remove('hidden');
            button.textContent = 'Hide Memory';

            if (media.tagName === 'VIDEO') {
                media.muted = false;
                media.play().catch(() => {});
            }
        } else {
            mediaContainer.classList.add('hidden');
            button.textContent = 'View Memory';
        }
    });
});
```
