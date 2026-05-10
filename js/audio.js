document.addEventListener("DOMContentLoaded", () => {
    const hoverSound = new Audio('../sound/swich_aboutus.mp3');
    document.querySelectorAll('.team-cards-container .member-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(e => console.log('Audio play failed', e));
        });
    });
});