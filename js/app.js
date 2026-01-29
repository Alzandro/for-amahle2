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
        // Check if passphrase was already entered (session-based, no storage)
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
        const nowSAST = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Johannesburg"}));

        if (nowSAST >= VALENTINE_DATE) {
            // Valentine's Day or later - show full app
            app.classList.remove('hidden');
            setupWelcome();
        } else {
            // Before Valentine's Day - show countdown
            countdown.classList.remove('hidden');
            startCountdown();
        }
    }

    function startCountdown() {
        function updateCountdown() {
            const now = new Date();
            const nowSAST = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Johannesburg"}));
            let timeLeft = VALENTINE_DATE - nowSAST;

            if (DEV_MODE) {
                timeLeft = 0;
            }

            if (timeLeft <= 0) {
                // Time's up! Show the app
                if (!DEV_MODE) {
                    countdown.classList.add('hidden');
                }
                app.classList.remove('hidden');
                setupWelcome();
                if (!DEV_MODE) {
                    return;
                }
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
        setInterval(updateCountdown, 1000); // Update every second

        // Setup limited preview functionality
        setupLimitedPreview();
    }

    function setupLimitedPreview() {
        const showPhotoBtn = document.getElementById('show-photo');
        const photoPreview = document.getElementById('photo-preview');
        const showAudioBtn = document.getElementById('show-audio');
        const audioPreview = document.getElementById('audio-preview');
        const showLetterBtn = document.getElementById('show-letter');
        const letterPreview = document.getElementById('letter-preview');

        showPhotoBtn.addEventListener('click', () => {
            togglePreview(photoPreview);
        });

        showAudioBtn.addEventListener('click', () => {
            togglePreview(audioPreview);
        });

        showLetterBtn.addEventListener('click', () => {
            togglePreview(letterPreview);
        });
    }

    function togglePreview(previewElement) {
        const isHidden = previewElement.classList.contains('hidden');
        // Hide all previews first
        document.querySelectorAll('.preview-content').forEach(el => {
            el.classList.add('hidden');
        });
        // Show the clicked one if it was hidden
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
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show selected section
        document.getElementById(sectionName).classList.remove('hidden');

        // Update nav buttons
        navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionName) {
                btn.classList.add('active');
            }
        });
    }

    // Navigation event listeners
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showSection(this.dataset.section);
        });
    });

    function loadContent() {
        loadTimeline();
        loadLetters();
        loadMusic();
        loadGames();
        setupFinalQuestion();
    }

    function loadTimeline() {
        const timelineContainer = document.querySelector('.timeline-container');

        // Sample memories - replace with your actual memories
        const memories = [
            {
                type: 'image',
                src: 'assets/images/memory1.jpg',
                date: 'January 15, 2024',
                caption: 'Our first adventure together...'
            },
            {
                type: 'video',
                src: 'assets/video/memory1.mp4',
                date: 'February 14, 2024',
                caption: 'Happy Valentine\'s Day, my love!'
            },
            {
                type: 'image',
                src: 'assets/images/memory2.jpg',
                date: 'March 10, 2024',
                caption: 'A beautiful sunset we shared...'
            }
        ];

        memories.forEach(memory => {
            const card = document.createElement('div');
            card.className = 'memory-card';

            let mediaElement;
            if (memory.type === 'image') {
                mediaElement = `<img src="${memory.src}" alt="Memory" loading="lazy">`;
            } else {
                mediaElement = `<video controls><source src="${memory.src}" type="video/mp4"></video>`;
            }

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

        // Sample letters - replace with your actual letters
        const letters = [
            {
                content: `My Dearest Love,

Every moment with you feels like a beautiful dream I never want to wake from. Your smile lights up my world, and your laughter is the sweetest music to my ears.

Forever yours,
With all my heart`
            },
            {
                content: `My Love,

In your eyes, I see my future. In your arms, I find my home. In your heart, I discover true love.

Eternally yours`
            }
        ];

        letters.forEach((letter, index) => {
            const card = document.createElement('div');
            card.className = 'letter-card';
            card.innerHTML = `
                <div class="letter-content">${letter.content}</div>
            `;

            card.addEventListener('click', function() {
                // Simple envelope animation effect
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });

            lettersContainer.appendChild(card);
        });
    }

    function loadMusic() {
        const musicContainer = document.querySelector('.music-container');

        // Sample songs - replace with your actual songs
        const songs = [
            {
                src: 'assets/audio/song1.mp3',
                caption: '"Our Song" - The melody that reminds me of you every time I hear it.'
            },
            {
                src: 'assets/audio/song2.mp3',
                caption: '"Forever" - Because that\'s how long I want to love you.'
            }
        ];

        songs.forEach(song => {
            const card = document.createElement('div');
            card.className = 'music-card';
            card.innerHTML = `
                <audio class="music-player" controls>
                    <source src="${song.src}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                <div class="music-caption">${song.caption}</div>
            `;

            musicContainer.appendChild(card);
        });
    }

    function loadGames() {
        const gamesContainer = document.querySelector('.games-container');

        const quizHTML = `
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

        gamesContainer.innerHTML = quizHTML;

        // Quiz functionality
        const quizOptions = document.querySelectorAll('.quiz-option');
        const quizFeedback = document.querySelector('.quiz-feedback');

        quizOptions.forEach(option => {
            option.addEventListener('click', function() {
                const answer = this.dataset.answer;
                if (answer === 'correct') {
                    quizFeedback.textContent = 'Correct! You know me so well! ❤️';
                    quizFeedback.style.color = '#ff6b9d';
                } else {
                    quizFeedback.textContent = 'Nice try, but I love everything about you! 💕';
                    quizFeedback.style.color = '#ffb3c1';
                }

                // Reset after 3 seconds
                setTimeout(() => {
                    quizFeedback.textContent = '';
                }, 3000);
            });
        });
    }

    function setupFinalQuestion() {
        finalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const answer = this.id;
                if (answer === 'yes-updates') {
                    finalMessage.textContent = 'Wonderful! Our story continues to grow... 💕';
                } else {
                    finalMessage.textContent = 'Too bad. Updates already running in the background. Come back in a year. 😉';
                }
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

        // Close all other open items
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
                media.play();
            }
        } else {
            mediaContainer.classList.add('hidden');
            button.textContent = 'View Memory';

            if (media.tagName === 'VIDEO') {
                media.pause();
                media.currentTime = 0;
            }
        }
    });
});
