const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

const insertion = `
        /* Force allow touch scrolling */
        .af-skins, .af-fleet-scroll {
            touch-action: pan-x !important;
            -webkit-overflow-scrolling: touch !important;
            overflow-x: auto !important;
            pointer-events: auto !important;
        }
        .af-skin-card, .af-skin-img-wrap, .af-skin-img {
            pointer-events: auto !important;
            touch-action: pan-x pan-y !important;
        }
        .screen .af-main, .screen .af-center {
            touch-action: pan-y !important;
            -webkit-overflow-scrolling: touch !important;
            pointer-events: auto !important;
        }
        .screen {
            pointer-events: auto !important;
            touch-action: auto !important;
        }
`;

html = html.replace('</style>', insertion + '\n</style>');
fs.writeFileSync('paper_plane_game.html', html);
