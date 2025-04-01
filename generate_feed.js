const fs = require('fs');

function convertToRSSDate(dateStr) {
    // Input format: "Lunes 24 de Marzo 2025"
    const months = {
        'Enero': 'Jan',
        'Febrero': 'Feb',
        'Marzo': 'Mar',
        'Abril': 'Apr',
        'Mayo': 'May',
        'Junio': 'Jun',
        'Julio': 'Jul',
        'Agosto': 'Aug',
        'Septiembre': 'Sep',
        'Octubre': 'Oct',
        'Noviembre': 'Nov',
        'Diciembre': 'Dec'
    };

    const days = {
        'Lunes': 'Mon',
        'Martes': 'Tue',
        'Miércoles': 'Wed',
        'Jueves': 'Thu',
        'Viernes': 'Fri',
        'Sábado': 'Sat',
        'Domingo': 'Sun'
    };

    const parts = dateStr.split(' ');
    const weekday = days[parts[0]];
    const day = parts[1].padStart(2, '0');
    const month = months[parts[3]];
    const year = parts[4];

    return `${weekday}, ${day} ${month} ${year} 17:00:00 +0000`;
}

function getSeasonEpisode(id) {
    let season, episode;
    
    if (id <= 34) {
        season = 1;
        episode = id;
    } else if (id <= 73) {
        season = 2;
        episode = id - 34;
    } else {
        season = 3;
        episode = id - 73;
    }
    
    return {
        season: season.toString(),
        episode: episode.toString().padStart(2, '0')
    };
}

function generateFeed() {
    // Read episodes.json
    const episodesData = JSON.parse(fs.readFileSync('episodes.json', 'utf8'));
    const episodes = episodesData.episodes;

    // Sort episodes by ID in descending order
    episodes.sort((a, b) => b.id - a.id);

    // Generate feed header
    let feed = `<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" version="2.0">
  <channel>
    <title>De los Adoquines a los Alpes</title>
    <link>https://cuacfm.org/globeros/</link>
    <description>&lt;p&gt;&amp;iquest;Te emocionas viendo la Par&amp;iacute;s- Roubaix pero no has hecho cien metros de pav&amp;eacute; en tu vida?, &amp;iquest;lo que mejor conoces de Flandes es la cerveza pero dar&amp;iacute;as un ri&amp;ntilde;&amp;oacute;n por subir el Paterberg?, &amp;iquest;est&amp;aacute;s deseando que llegue el Tour pero te duermes en todas las etapas al sprint?. Si es que s&amp;iacute;, eres de los nuestros. Los globeros somos legi&amp;oacute;n. Y aunque sepamos m&amp;aacute;s de p&amp;aacute;jaras que un ornit&amp;oacute;logo, y tengamos que guardar cama s&amp;oacute;lo de mirar con deseo una bici aero, no podemos evitar dar la turra urbi et orbi con lo que m&amp;aacute;s nos gusta: todo lo relacionado con el ciclismo. Para que no nos echen de nuestras casas por pesaos, nos hemos venido a Cuac FM, que son gente de mucho aguante para esto de las parafilias y nos dejan despotricar a nuestras anchas. Asi que, qu&amp;iacute;tate el casco, ponte los cascos y &amp;uacute;nete a De los Adoquines a los Alpes. &amp;iexcl;Globeros al Poder!.&lt;/p&gt;

&lt;p&gt;Todos los lunes, a las 19.00, en Cuac FM.&lt;/p&gt;</description>
    <atom:link href="https://cuacfm.org/globeros/feed.rss" rel="self"/>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <itunes:explicit>clean</itunes:explicit>
    <itunes:summary>¿Te emocionas viendo la París- Roubaix pero no has hecho cien metros de pavé en tu vida?, ¿lo que mejor conoces de Flandes es la cerveza pero darías un riñón por subir el Paterberg?, ¿estás deseando que llegue el Tour pero te duermes en todas las etapas al sprint?. Si es que sí, eres de los nuestros. Los globeros somos legión. Y aunque sepamos más de pájaras que un ornitólogo, y tengamos que guardar cama sólo de mirar con deseo una bici aero, no podemos evitar dar la turra urbi et orbi con lo que más nos gusta: todo lo relacionado con el ciclismo. Para que no nos echen de nuestras casas por pesaos, nos hemos venido a Cuac FM, que son gente de mucho aguante para esto de las parafilias y nos dejan despotricar a nuestras anchas. Asi que, quítate el casco, ponte los cascos y únete a De los Adoquines a los Alpes. ¡Globeros al Poder!.
Todos los lunes, a las 19.00, en Cuac FM.</itunes:summary>
    <itunes:image href="https://cuacfm.org/radioco/media/photos/CHAPA.jpg"/>
    <itunes:category text="Sports"/>
    <image url="https://cuacfm.org/radioco/media/_versions/photos/CHAPA_rss_image.jpg" link="https://cuacfm.org/radioco/programmes/de-los-adoquines-los-alpes/" title="De los Adoquines a los Alpes"/>
    <itunes:author>CUAC FM</itunes:author>
    <itunes:owner>
      <itunes:email>delosadoquinesalosandes@gmail.com</itunes:email>
      <itunes:name>CUAC FM</itunes:name>
    </itunes:owner>`;

    // Generate items
    episodes.forEach(episode => {
        const seasonEpisode = getSeasonEpisode(episode.id);
        const pubDate = convertToRSSDate(episode.date);
        const topicsHtml = episode.topics.map(topic => `    • ${topic}`).join('\n');

        feed += `
  <item>
    <title>${seasonEpisode.season}x${seasonEpisode.episode} De los Adoquines a los Alpes</title>
    <link>https://cuacfm.org/globeros/episodio.html?id=${episode.id}</link>
    <description>${episode.description}

${topicsHtml}
    </description>
    <pubDate>${pubDate}</pubDate>
    <enclosure url="${episode.audio_url}" length="82077558" type="audio/mpeg"/>
    <itunes:subtitle/>
    <itunes:summary/>
    <itunes:duration>0:01:00</itunes:duration>
    <itunes:image href="${episode.cover_image}" />
  </item>`;
    });

    // Close feed
    feed += `
  </channel>
</rss>`;

    // Write to file
    fs.writeFileSync('feed.rss', feed);
    console.log('Feed generated successfully!');
}

generateFeed(); 