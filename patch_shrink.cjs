const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

const insertion = `
        .screen .af-main > *, .screen .af-center > * {
            flex-shrink: 0 !important;
        }
`;

html = html.replace('</style>', insertion + '\n</style>');
fs.writeFileSync('paper_plane_game.html', html);
