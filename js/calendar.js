async function loadCompetitions() {
    try {
        // Try local file first, fallback to remote URL
        let response;
        try {
            response = await fetch('competitions.json');
        } catch (localError) {
            console.log('Local file not found, trying remote URL...');
            response = await fetch('https://cuacfm.org/globeros/competitions.json');
        }
        
        const data = await response.json();
        const competitions = data.competitions;
        
        const container = document.querySelector('#pills-home .col-md-12');
        container.innerHTML = ''; // Clear existing content

        // Get current date
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

        // Function to parse date string (e.g., "21-26 Enero" or "2 Febrero")
        function parseDate(dateStr) {
            const months = {
                'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4, 'Mayo': 5, 'Junio': 6,
                'Julio': 7, 'Agosto': 8, 'Septiembre': 9, 'Octubre': 10
            };
            
            const [dayRange, month] = dateStr.split(' ');
            const [startDay] = dayRange.split('-');
            return {
                month: months[month],
                day: parseInt(startDay)
            };
        }

        // Function to check if a competition is in the future
        function isFutureCompetition(competition) {
            const parsedDate = parseDate(competition.date);
            const competitionDate = new Date(2024, parsedDate.month - 1, parsedDate.day);
            competitionDate.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
            
            // If the competition is in the past, consider it for next year
            if (competitionDate < currentDate) {
                competitionDate.setFullYear(2025);
            }
            
            return competitionDate >= currentDate;
        }

        // Find the next 5 competitions
        let nextCompetitions = [];
        let found = false;

        // First try to find competitions from current date onwards
        for (let i = 0; i < competitions.length; i++) {
            if (isFutureCompetition(competitions[i])) {
                nextCompetitions = competitions.slice(i, i + 5);
                found = true;
                break;
            }
        }

        // If we didn't find enough future competitions, wrap around to the beginning
        if (!found || nextCompetitions.length < 5) {
            const remainingCount = 5 - nextCompetitions.length;
            const wrappedCompetitions = competitions.slice(0, remainingCount);
            nextCompetitions = [...nextCompetitions, ...wrappedCompetitions];
        }
        
        // Display the next 5 competitions
        nextCompetitions.forEach(competition => {
            const competitionHTML = `
                <div class="row bg-white align-items-center ml-0 mr-0 py-4 match-entry">
                    <div class="col-md-4 col-lg-4 mb-4 mb-lg-0">
                        <div class="text-center text-lg-left">
                            <div class="d-block d-lg-flex align-items-center">
                                <div class="image image-small text-center mb-3 mb-lg-0 mr-lg-3">
                                    <img src="${competition.image}" alt="${competition.name}" class="img-fluid">
                                </div>
                                <div class="text">
                                    <h3 class="h5 mb-0 text-black">${competition.name}</h3>
                                    <span class="text-uppercase small country">${competition.date}</span>
                                    <p><a target="_blank" href="${competition.wikipedia_url}" class="btn btn-primary btn-sm rounded-0 py-2 px-3">Leer más</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += competitionHTML;
        });
    } catch (error) {
        console.error('Error loading competitions:', error);
    }
}

// Load competitions when the page loads
document.addEventListener('DOMContentLoaded', loadCompetitions); 