const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

const insertion = `
        .af-fleet-scroll img, .af-skins img {
            -webkit-user-drag: none;
            user-select: none;
        }
`;

html = html.replace('</style>', insertion + '\n</style>');
fs.writeFileSync('paper_plane_game.html', html);
