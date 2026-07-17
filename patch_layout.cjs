const fs = require('fs');
let html = fs.readFileSync('paper_plane_game.html', 'utf8');

const insertion = `
        /* Override flexbox layout to guarantee scrollability */
        .screen {
            display: block !important;
            position: absolute !important;
            top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
            height: 100% !important;
        }
        .af-topbar {
            position: absolute !important;
            top: 0 !important; left: 0 !important; width: 100% !important;
            z-index: 20 !important;
        }
        .af-bottomnav {
            position: absolute !important;
            z-index: 20 !important;
        }
        .screen .af-main, .screen .af-center {
            position: absolute !important;
            top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
            width: 100% !important;
            max-width: 560px !important;
            margin: 0 auto !important;
            height: 100% !important;
            overflow-y: scroll !important; /* Force scrollbar */
            -webkit-overflow-scrolling: touch !important;
            box-sizing: border-box !important;
            padding-top: 80px !important;
            padding-bottom: 120px !important;
            display: flex !important;
            flex-direction: column !important;
        }
        #start-screen .af-main {
            padding-top: 24px !important; /* start screen has no topbar */
        }
`;

html = html.replace('</style>', insertion + '\n</style>');
fs.writeFileSync('paper_plane_game.html', html);
