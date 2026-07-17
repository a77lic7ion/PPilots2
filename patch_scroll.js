const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

// We can add a script block to enable click-and-drag scrolling on all horizontal scroll containers.
const scriptToAdd = `
        // Enable mouse click-and-drag for horizontal scrolling to simulate swipe on desktop
        document.querySelectorAll('.af-fleet-scroll, .af-skins').forEach(slider => {
            let isDown = false;
            let startX;
            let scrollLeft;

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                slider.classList.add('active');
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
            slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.classList.remove('active');
            });
            slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.classList.remove('active');
            });
            slider.addEventListener('mousemove', (e) => {
                if(!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2; // scroll-fast
                slider.scrollLeft = scrollLeft - walk;
            });
        });
`;

// Insert the script at the end of the init() function or just in a script tag before </body>
const insertionPoint = "requestAnimationFrame(gameLoop);";
if (html.includes(insertionPoint)) {
    // we can also put it in init()
}
