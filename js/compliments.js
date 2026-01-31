document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.compliment-card');
    const videos = document.querySelectorAll('.compliment-video');

    function muteOtherVideos(activeVideo) {
        videos.forEach(v => {
            if (v !== activeVideo) {
                v.pause();
                v.currentTime = 0;
            }
        });
    }

    cards.forEach(card => {
        const btn = card.querySelector('.compliment-toggle');
        const media = card.querySelector('.compliment-media');
        const video = card.querySelector('video');

        if (!btn || !media) return;

        btn.addEventListener('click', () => {
            const open = !media.classList.contains('hidden');

            media.classList.toggle('hidden');
            card.classList.toggle('open', !open);

            btn.textContent = open ? 'View Compliment' : 'Hide Compliment';

            if (video && !open) {
                muteOtherVideos(video);
                video.play().catch(() => {});
            }

            if (video && open) {
                video.pause();
            }
        });
    });

});
