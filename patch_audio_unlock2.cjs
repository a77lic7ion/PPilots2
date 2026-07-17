const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

const targetStr = `        // Browsers block audio until the first user gesture — unlock menu music on first tap/click
        window.addEventListener('pointerdown', function unlockAudio() {
            window.removeEventListener('pointerdown', unlockAudio);
            if (!muted) {
                if (currentMusic && currentMusic.paused) currentMusic.play().catch(()=>{});
                else if (!currentMusic) resumeMusicForState();
            }
        });`;

const replacementStr = `        // Browsers block audio until the first user gesture
        const unlockAudio = () => {
            window.removeEventListener('pointerdown', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
            if (!muted) {
                if (currentMusic && currentMusic.paused) currentMusic.play().catch(()=>{});
                else if (!currentMusic) resumeMusicForState();
            }
        };
        window.addEventListener('pointerdown', unlockAudio);
        window.addEventListener('touchstart', unlockAudio, { passive: true });
        window.addEventListener('click', unlockAudio);
        window.addEventListener('keydown', unlockAudio);`;

html = html.replace(targetStr, replacementStr);
fs.writeFileSync('paper_plane_game.html', html);
