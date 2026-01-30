// Valentine Nav JavaScript
// Handles passphrase gate, countdown logic, and navigation

const DEV_MODE = true; // 🔧 set to false before deployment

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

    document.addEventListener('DOMContentLoaded', () => {
    const finalBtn = document.getElementById('final-btn');

    const requiredPages = [
        '/timeline.html',
        '/compliments.html',
        '/letters.html',
        '/songs.html',
        '/games.html'
    ];

    const allVisited = requiredPages.every(
        page => localStorage.getItem('visited-' + page) === 'true'
    );

    if (allVisited) {
        finalBtn.classList.remove('locked');
        finalBtn.querySelector('.btn-icon').textContent = '💍';
        finalBtn.querySelector('.btn-desc').textContent =
            'Tap when you’re ready, my love';

        finalBtn.onclick = () => {
            window.location.href = 'final.html';
        };
    }
});

});