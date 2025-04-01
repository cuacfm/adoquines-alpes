// Read episodes data
const fs = require('fs');

// Spanish ordinal numbers
const ordinals = {
    1: "primer", 2: "segundo", 3: "tercer", 4: "cuarto", 5: "quinto",
    6: "sexto", 7: "séptimo", 8: "octavo", 9: "noveno", 10: "décimo",
    11: "undécimo", 12: "duodécimo", 13: "decimotercer", 14: "decimocuarto",
    15: "decimoquinto", 16: "decimosexto", 17: "decimoséptimo", 18: "decimoctavo",
    19: "decimonoveno", 20: "vigésimo", 21: "vigésimo primero", 22: "vigésimo segundo",
    23: "vigésimo tercer", 24: "vigésimo cuarto", 25: "vigésimo quinto",
    26: "vigésimo sexto", 27: "vigésimo séptimo", 28: "vigésimo octavo",
    29: "vigésimo noveno", 30: "trigésimo", 31: "trigésimo primero",
    32: "trigésimo segundo", 33: "trigésimo tercer", 34: "trigésimo cuarto",
    35: "trigésimo quinto", 36: "trigésimo sexto", 37: "trigésimo séptimo",
    38: "trigésimo octavo", 39: "trigésimo noveno", 40: "cuadragésimo",
    41: "cuadragésimo primero", 42: "cuadragésimo segundo", 43: "cuadragésimo tercer",
    44: "cuadragésimo cuarto", 45: "cuadragésimo quinto", 46: "cuadragésimo sexto",
    47: "cuadragésimo séptimo", 48: "cuadragésimo octavo", 49: "cuadragésimo noveno",
    50: "quincuagésimo", 51: "quincuagésimo primero", 52: "quincuagésimo segundo",
    53: "quincuagésimo tercer", 54: "quincuagésimo cuarto", 55: "quincuagésimo quinto",
    56: "quincuagésimo sexto", 57: "quincuagésimo séptimo", 58: "quincuagésimo octavo",
    59: "quincuagésimo noveno", 60: "sexagésimo", 61: "sexagésimo primero",
    62: "sexagésimo segundo", 63: "sexagésimo tercer", 64: "sexagésimo cuarto",
    65: "sexagésimo quinto", 66: "sexagésimo sexto", 67: "sexagésimo séptimo",
    68: "sexagésimo octavo", 69: "sexagésimo noveno", 70: "septuagésimo",
    71: "septuagésimo primero", 72: "septuagésimo segundo", 73: "septuagésimo tercer",
    74: "septuagésimo cuarto", 75: "septuagésimo quinto", 76: "septuagésimo sexto",
    77: "septuagésimo séptimo", 78: "septuagésimo octavo", 79: "septuagésimo noveno",
    80: "octogésimo", 81: "octogésimo primero", 82: "octogésimo segundo",
    83: "octogésimo tercer", 84: "octogésimo cuarto", 85: "octogésimo quinto",
    86: "octogésimo sexto", 87: "octogésimo séptimo", 88: "octogésimo octavo",
    89: "octogésimo noveno", 90: "nonagésimo", 91: "nonagésimo primero",
    92: "nonagésimo segundo", 93: "nonagésimo tercer", 94: "nonagésimo cuarto",
    95: "nonagésimo quinto", 96: "nonagésimo sexto", 97: "nonagésimo séptimo",
    98: "nonagésimo octavo", 99: "nonagésimo noveno", 100: "centésimo"
};

// Function to generate HTML for an episode
function generateEpisodeHtml(episode) {
    const ordinal = ordinals[episode.id] || `${episode.id}º`;
    const topicsHtml = episode.topics.map(topic => `<p class="mb-0">&#8226; ${topic}</p>`).join('\n');
    
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>${episode.title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Muli:300,400,700,900" rel="stylesheet">
    <link rel="stylesheet" href="fonts/icomoon/style.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/jquery-ui.css">
    <link rel="stylesheet" href="css/owl.carousel.min.css">
    <link rel="stylesheet" href="css/owl.theme.default.min.css">
    <link rel="stylesheet" href="css/jquery.fancybox.min.css">
    <link rel="stylesheet" href="css/bootstrap-datepicker.css">
    <link rel="stylesheet" href="fonts/flaticon/font/flaticon.css">
    <link rel="stylesheet" href="css/aos.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
    <div class="site-wrap">
        <div class="site-mobile-menu site-navbar-target">
            <div class="site-mobile-menu-header">
                <div class="site-mobile-menu-close mt-3">
                    <span class="icon-close2 js-menu-toggle"></span>
                </div>
            </div>
            <div class="site-mobile-menu-body"></div>
        </div>

        <header class="site-navbar py-4 js-sticky-header site-navbar-target" role="banner">
            <div class="container-fluid">
                <div class="d-flex align-items-center">
                    <div class="site-logo mr-auto w-25"><a href="index.html"><img src="images/logo.png" alt=""></a></div>
                    <div class="mx-auto text-center">
                        <nav class="site-navigation position-relative text-right" role="navigation">
                            <ul class="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                                <li><a href="index.html" class="nav-link">Inicio</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>

        <div class="site-blocks-cover overlay" style="background-image: url(${episode.cover_image});" data-aos="fade" data-stellar-background-ratio="0.5">
            <div class="container">
                <div class="row align-items-center justify-content-start">
                    <div class="col-md-6 text-center text-md-left" data-aos="fade-up" data-aos-delay="400">
                        <h1 class="bg-text-line">${episode.title}</h1>
                        <p class="mt-4">Este es un programa sin pretensiones de ser una cátedra, hecho desde A Coruña pero con vocación universal, y concebido para hablar de lo que más nos gusta: el ciclismo en todas sus manifestaciones. Un programa perpetrado por globeros, para globeros y globeras. Si no sabéis qué es un globero pero os gusta la bici, este es vuestro sitio.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="site-section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="p-3 p-lg-5 border">
                            <div class="text p-4">
                                <h2 class="h5 text-black"><a>${episode.title}</a></h2>
                                <span class="text-uppercase date d-block mb-3"><small>CUAC FM&bullet; ${episode.date}</small></span>
                                <p class="mb-0">${episode.description}</p>
                                ${topicsHtml}
                                ${episode.has_komoot ? `<iframe src="${episode.komoot_embed}" width="100%" height="700" frameborder="0" scrolling="no"></iframe>` : ''}
                                <p class="text-uppercase text-black font-weight-bold mb-3">Audio Podcast</p>
                                <audio controls name="media"><source src="${episode.audio_url}" type="audio/mpeg"></audio>
                                <p class="text-uppercase text-black font-weight-bold mb-3">Video Podcast</p>
                                ${episode.has_video 
                                    ? `<iframe width="560" height="315" src="${episode.video_url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
                                    : '<p>Esta semana no tenemos vídeo de Youtube por problemas técnicos.</p>'
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="site-footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6">
                                <h2 class="footer-heading mb-4">Sobre Nosotros</h2>
                                <p>Los adoquines a los Alpes es un podcast sobre ciclismo en todas sus manifestaciones.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>

    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/jquery-migrate-3.0.1.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/jquery.stellar.min.js"></script>
    <script src="js/jquery.countdown.min.js"></script>
    <script src="js/bootstrap-datepicker.min.js"></script>
    <script src="js/jquery.easing.1.3.js"></script>
    <script src="js/aos.js"></script>
    <script src="js/jquery.fancybox.min.js"></script>
    <script src="js/jquery.sticky.js"></script>
    <script src="js/main.js"></script>
</body>
</html>`;
}

// Generate episodes
try {
    // Read episodes data
    const episodesData = JSON.parse(fs.readFileSync('episodes.json', 'utf8'));
    
    // Generate HTML for each episode
    episodesData.episodes.forEach(episode => {
        const html = generateEpisodeHtml(episode);
        fs.writeFileSync(`episodio${episode.id}.html`, html);
        console.log(`Generated episodio${episode.id}.html`);
    });
    
    console.log('All episodes generated successfully!');
} catch (error) {
    console.error('Error generating episodes:', error);
} 