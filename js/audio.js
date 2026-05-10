document.addEventListener("DOMContentLoaded", () => {
    const hoverSound = new Audio('../sound/swich_aboutus.mp3');
    document.querySelectorAll('.team-cards-container .member-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(e => console.log('Audio play failed', e));
        });
    });

    const audreyImg = document.querySelector('img[alt="Audrey"]');
    if (audreyImg) {
        const audreyAudio = new Audio('../sound/audreyS.mp3');

        audreyAudio.addEventListener('timeupdate', () => {
            if (audreyAudio.currentTime >= 108.24) { // end of the audio
                audreyAudio.pause();
            }
        });

        audreyImg.addEventListener('mouseenter', () => {
            audreyAudio.currentTime = 62; // beginning of the audio
            audreyAudio.play().catch(e => console.log('Audio play failed', e));
        });

        audreyImg.addEventListener('mouseleave', () => {
            audreyAudio.pause();
        });
    }

    const nourImg = document.querySelector('img[alt="Nour"]');
    if (nourImg) {
        const nourAudio = new Audio('../sound/nourS.mp3');

        nourAudio.addEventListener('timeupdate', () => {
            if (nourAudio.currentTime >= 85.8) { // end of the audio
                nourAudio.pause();
            }
        });

        nourImg.addEventListener('mouseenter', () => {
            nourAudio.currentTime = 5; // beginning of the audio
            nourAudio.play().catch(e => console.log('Audio play failed', e));
        });

        nourImg.addEventListener('mouseleave', () => {
            nourAudio.pause();
        });
    }
});