const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

const targetStr = `        // Fit Viewport on resize`;
const replacementStr = `        // Enable mouse click-and-drag for horizontal scrolling to simulate swipe on desktop
        document.querySelectorAll('.af-fleet-scroll, .af-skins').forEach(slider => {
            let isDown = false;
            let startX;
            let scrollLeft;

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
            slider.addEventListener('mouseleave', () => {
                isDown = false;
            });
            slider.addEventListener('mouseup', () => {
                isDown = false;
            });
            slider.addEventListener('mousemove', (e) => {
                if(!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2;
                slider.scrollLeft = scrollLeft - walk;
            });
        });

        // Fit Viewport on resize`;

html = html.replace(targetStr, replacementStr);
fs.writeFileSync('paper_plane_game.html', html);
