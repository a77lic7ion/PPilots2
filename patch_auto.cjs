const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

html = html.replace('overflow-y: scroll !important;', 'overflow-y: auto !important;');

fs.writeFileSync('paper_plane_game.html', html);
