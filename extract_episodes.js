const fs = require('fs');
const cheerio = require('cheerio');

function extractEpisodeData(id) {
    try {
        const filename = `episodio${id}.html`;
        const html = fs.readFileSync(filename, 'utf8');
        const $ = cheerio.load(html);

        // Extract data from HTML
        const title = $('.h5.text-black').first().text();
        const date = $('.date').first().text().replace('CUAC FM•', '').trim();
        const description = $('.mb-0').first().text();
        
        // Extract topics (bullet points)
        const topics = [];
        $('.mb-0').each((i, el) => {
            const text = $(el).text();
            if (text.startsWith('•')) {
                topics.push(text.replace('•', '').trim());
            }
        });

        // Check for video and Komoot
        const hasVideo = $('iframe[src*="youtube"]').length > 0;
        const hasKomoot = $('iframe[src*="komoot"]').length > 0;
        
        // Get URLs
        const videoUrl = hasVideo ? $('iframe[src*="youtube"]').attr('src') : '';
        const audioUrl = $('audio source').attr('src');
        const komootEmbed = hasKomoot ? $('iframe[src*="komoot"]').attr('src') : '';
        const coverImage = $('.site-blocks-cover').css('background-image').replace('url(', '').replace(')', '');

        return {
            id,
            title,
            date,
            description,
            topics,
            audio_url: audioUrl,
            video_url: videoUrl,
            has_video: hasVideo,
            cover_image: coverImage,
            has_komoot: hasKomoot,
            komoot_embed: komootEmbed
        };
    } catch (error) {
        console.error(`Error extracting data from episode ${id}:`, error);
        return null;
    }
}

// Main function
function main() {
    const episodes = [];
    
    // Try to extract data from all episodes (1 to 77)
    for (let id = 1; id <= 77; id++) {
        const episode = extractEpisodeData(id);
        if (episode) {
            episodes.push(episode);
        }
    }

    // Save to JSON file
    const episodesData = { episodes };
    fs.writeFileSync('episodes.json', JSON.stringify(episodesData, null, 2));
    console.log(`Successfully extracted data from ${episodes.length} episodes`);
}

main(); 