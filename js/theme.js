/* ------------------------------------
GLOBAL THEME HANDLER
------------------------------------ */

function applyTheme(theme) {
    document.body.classList.remove('light', 'dark');

    if (theme === 'dark') {
        document.body.classList.add('dark');
    } else if (theme === 'light') {
        document.body.classList.add('light');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.add(prefersDark ? 'dark' : 'light');
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);
    updateActiveThemeButton(savedTheme);


    // Listen for system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('theme') === 'system') {
            applyTheme('system');
        }
    });
}

document.addEventListener('DOMContentLoaded', initTheme);


function updateActiveThemeButton(theme) {
    document.querySelectorAll('.theme-toggle button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.theme-toggle button');
    if (!btn) return;

    const theme = btn.dataset.theme;
    localStorage.setItem('theme', theme);
    applyTheme(theme);
    updateActiveThemeButton(theme);
});

