const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

const regex = /document\.querySelectorAll\('\.af-fleet-scroll, \.af-skins, \.af-main, \.af-center'\)\.forEach\(slider => {/g;
html = html.replace(regex, "document.querySelectorAll('.af-fleet-scroll, .af-skins').forEach(slider => {");

fs.writeFileSync('paper_plane_game.html', html);
