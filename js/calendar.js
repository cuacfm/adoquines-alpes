async function loadCompetitions() {
    try {
        const response = await fetch('/competitions.json');
        const data = await response.json();
        const competitions = data.competitions;
        
        const container = document.querySelector('#pills-home .col-md-12');
        container.innerHTML = ''; // Clear existing content
        
        competitions.forEach(competition => {
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