const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

const insertion = `
        setInterval(() => {
            const m = document.querySelector('#start-screen .af-main');
            if(m && m.parentElement.style.display !== 'none') {
                console.log('Main SCROLL:', m.scrollHeight, m.clientHeight, 'Screen height:', m.parentElement.clientHeight, 'Wrapper:', document.getElementById('game-wrapper').clientHeight);
            }
        }, 2000);
`;

html = html.replace('</script>', insertion + '\n</script>');
fs.writeFileSync('paper_plane_game.html', html);
