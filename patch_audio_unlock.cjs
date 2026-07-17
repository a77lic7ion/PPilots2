const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

const targetStr = `        // Browsers block audio until the first user gesture — unlock menu music on first tap/click
        window.addEventListener('pointerdown', function unlockAudio() {
            window.removeEventListener('pointerdown', unlockAudio);
            if (!muted && !currentMusic) resumeMusicForState();
        });`;

const replacementStr = `        // Browsers block audio until the first user gesture — unlock menu music on first tap/click
        window.addEventListener('pointerdown', function unlockAudio() {
            window.removeEventListener('pointerdown', unlockAudio);
            if (!muted) {
                if (currentMusic && currentMusic.paused) currentMusic.play().catch(()=>{});
                else if (!currentMusic) resumeMusicForState();
            }
        });`;

html = html.replace(targetStr, replacementStr);
fs.writeFileSync('paper_plane_game.html', html);
