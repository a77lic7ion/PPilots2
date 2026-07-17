const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

const targetStr = `        // Enable mouse click-and-drag for horizontal scrolling to simulate swipe on desktop
        document.querySelectorAll('.af-fleet-scroll, .af-skins').forEach(slider => {`;

const replacementStr = `        // Enable mouse click-and-drag for scrolling to simulate swipe on desktop
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
        });

        // Fit Viewport on resize`;

html = html.replace(targetStr + "\n            let isDown = false;\n            let startX;\n            let scrollLeft;\n\n            slider.addEventListener('mousedown', (e) => {\n                isDown = true;\n                startX = e.pageX - slider.offsetLeft;\n                scrollLeft = slider.scrollLeft;\n            });\n            slider.addEventListener('mouseleave', () => {\n                isDown = false;\n            });\n            slider.addEventListener('mouseup', () => {\n                isDown = false;\n            });\n            slider.addEventListener('mousemove', (e) => {\n                if(!isDown) return;\n                e.preventDefault();\n                const x = e.pageX - slider.offsetLeft;\n                const walk = (x - startX) * 2;\n                slider.scrollLeft = scrollLeft - walk;\n            });\n        });", replacementStr);
fs.writeFileSync('paper_plane_game.html', html);
