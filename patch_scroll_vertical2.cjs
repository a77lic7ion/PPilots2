const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

const regex = /\/\/ Enable mouse click-and-drag for horizontal scrolling[\s\S]*?slider\.scrollLeft = scrollLeft - walk;\n            }\);\n        }\);/m;

const replacementStr = `// Enable mouse click-and-drag for scrolling to simulate swipe on desktop
        document.querySelectorAll('.af-fleet-scroll, .af-skins, .af-main, .af-center').forEach(slider => {
            let isDown = false;
            let startX, startY;
            let scrollLeft, scrollTop;

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - slider.offsetLeft;
                startY = e.pageY - slider.offsetTop;
                scrollLeft = slider.scrollLeft;
                scrollTop = slider.scrollTop;
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
                const y = e.pageY - slider.offsetTop;
                const walkX = (x - startX) * 2;
                const walkY = (y - startY) * 2;
                slider.scrollLeft = scrollLeft - walkX;
                slider.scrollTop = scrollTop - walkY;
            });
        });`;

html = html.replace(regex, replacementStr);
fs.writeFileSync('paper_plane_game.html', html);
