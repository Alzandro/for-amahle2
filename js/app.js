// Valentine App JavaScript
// Safe for multi-page use, mobile-friendly, crash-proof

const DEV_MODE = false; // 🔧 set to false before final Valentine deploy

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------
       HELPERS
    -------------------------------------------------- */

    function safeOn(el, event, handler) {
        if (el) el.addEventListener(event, handler);
    }

    /* --------------------------------------------------
       CONFIG
    -------------------------------------------------- */

    const PASSPHRASE = "18ALZ_XO_@Mahl3!25";
    const VALENTINE_DATE = new Date('2026-02-14T00:00:00+02:00');

    /* --------------------------------------------------
       DOM ELEMENTS
    -------------------------------------------------- */

    const gate = document.getElementById('gate');
    const countdown = document.getElementById('countdown');
    const app = document.getElementById('app');

    const passphraseInput = document.getElementById('passphrase-input');
    const submitPassphrase = document.getElementById('submit-passphrase');
    const retryMessage = document.getElementById('retry-message');

    const beginBtn = document.getElementById('begin-btn');
    const navBtns = document.querySelectorAll('.nav-btn');

    const finalBtns = document.querySelectorAll('#yes-updates, #no-updates');
    const finalMessage = document.getElementById('final-message');

    /* --------------------------------------------------
       INIT
    -------------------------------------------------- */

    initApp();

    function initApp() {
        if (!gate && !countdown && !app) return;

        if (sessionStorage.getItem('passphraseEntered')) {
            showApp();
        } else {
            setupPassphraseGate();
        }
    }

    /* --------------------------------------------------
       PASSPHRASE GATE
    -------------------------------------------------- */

    function setupPassphraseGate() {
        safeOn(submitPassphrase, 'click', checkPassphrase);
        safeOn(passphraseInput, 'keypress', e => {
            if (e.key === 'Enter') checkPassphrase();
        });
    }

    function checkPassphrase() {
        if (!passphraseInput) return;

        const answer = passphraseInput.value.trim();
        if (answer === PASSPHRASE) {
            sessionStorage.setItem('passphraseEntered', 'true');
            showApp();
        } else {
            retryMessage?.classList.remove('hidden');
            passphraseInput.value = '';
            setTimeout(() => retryMessage?.classList.add('hidden'), 3000);
        }
    }

    /* --------------------------------------------------
       COUNTDOWN / APP ENTRY
    -------------------------------------------------- */

    function showApp() {
        gate?.classList.add('hidden');
        checkDate();
    }

    function checkDate() {
        const now = new Date();
        const nowSAST = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Johannesburg" }));

        if (DEV_MODE || nowSAST >= VALENTINE_DATE) {
            countdown?.classList.add('hidden');
            app?.classList.remove('hidden');
        } else {
            countdown?.classList.remove('hidden');
            startCountdown();
        }
    }

    function startCountdown() {
        function update() {
            const now = new Date();
            const nowSAST = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Johannesburg" }));
            let diff = VALENTINE_DATE - nowSAST;

            if (DEV_MODE) diff = 0;

            if (diff <= 0) {
                countdown?.classList.add('hidden');
                app?.classList.remove('hidden');
                return;
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);

            setText('days', d);
            setText('hours', h);
            setText('minutes', m);
            setText('seconds', s);
        }

        update();
        setInterval(update, 1000);
        setupPreview();
    }

    function setText(id, val) {
        const el = document.getElementById(id);
        if (el) el.textContent = String(val).padStart(2, '0');
    }

    /* --------------------------------------------------
       PREVIEWS
    -------------------------------------------------- */

    function setupPreview() {
    function toggle(buttonId, previewId) {
        const btn = document.getElementById(buttonId);
        const preview = document.getElementById(previewId);

        if (!btn || !preview) return;

        btn.addEventListener('click', () => {
            preview.classList.toggle('hidden');
        });
    }

    toggle('show-photo', 'photo-preview');
    toggle('show-audio', 'audio-preview');
    toggle('show-letter', 'letter-preview');
}


    /* --------------------------------------------------
       NAVIGATION
    -------------------------------------------------- */

    safeOn(beginBtn, 'click', () => {
        window.location.href = "nav.html";
    });

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
            const target = document.getElementById(btn.dataset.section);
            target?.classList.remove('hidden');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    /* --------------------------------------------------
       FINAL QUESTION
    -------------------------------------------------- */

    finalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!finalMessage) return;
            finalMessage.textContent =
                btn.id === 'yes-updates'
                    ? 'Wonderful! Our story continues 💕'
                    : 'Too bad 😌 Updates already running behind the scenes.';
            finalMessage.classList.remove('hidden');
        });
    });

/* --------------------------------------------------
TIMELINE EXPAND (MULTI-OPEN SAFE)
-------------------------------------------------- */

document.querySelectorAll('.timeline-item').forEach(item => {
    const button = item.querySelector('.expand-btn');
    const mediaContainer = item.querySelector('.media-container');
    const media = mediaContainer?.querySelector('img, video');

    if (!button || !mediaContainer) return;

    button.addEventListener('click', () => {
        const isOpen = !mediaContainer.classList.contains('hidden');

        mediaContainer.classList.toggle('hidden');
        button.textContent = isOpen ? 'View Memory' : 'Hide Memory';

        if (media?.tagName === 'VIDEO') {
            if (!isOpen) {
                media.play().catch(() => {});
            } else {
                media.pause();
            }
        }
    });
});


});
