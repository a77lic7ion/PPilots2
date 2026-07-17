const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

const oldScript = `        document.querySelectorAll('.af-fleet-scroll, .af-skins').forEach(slider => {
            let isDown = false;
            let startX, startY;
            let scrollLeft, scrollTop;

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                slider.style.cursor = 'grabbing';
                startX = e.pageX - slider.offsetLeft;
                startY = e.pageY - slider.offsetTop;
                scrollLeft = slider.scrollLeft;
                scrollTop = slider.scrollTop;
            });
            slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.style.cursor = 'pointer';
            });
            slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.style.cursor = 'pointer';
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

const newScript = `        document.querySelectorAll('.af-fleet-scroll, .af-skins').forEach(slider => {
            let isDown = false;
            let startX, startY;
            let scrollLeft, scrollTop;

            slider.addEventListener('pointerdown', (e) => {
                if(e.pointerType !== 'mouse') return;
                isDown = true;
                slider.style.cursor = 'grabbing';
                startX = e.pageX - slider.offsetLeft;
                startY = e.pageY - slider.offsetTop;
                scrollLeft = slider.scrollLeft;
                scrollTop = slider.scrollTop;
            });
            slider.addEventListener('pointerleave', (e) => {
                if(e.pointerType !== 'mouse') return;
                isDown = false;
                slider.style.cursor = 'pointer';
            });
            slider.addEventListener('pointerup', (e) => {
                if(e.pointerType !== 'mouse') return;
                isDown = false;
                slider.style.cursor = 'pointer';
            });
            slider.addEventListener('pointermove', (e) => {
                if(!isDown || e.pointerType !== 'mouse') return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walkX = (x - startX) * 2;
                slider.scrollLeft = scrollLeft - walkX;
            });
        });`;

html = html.replace(oldScript, newScript);
fs.writeFileSync('paper_plane_game.html', html);
