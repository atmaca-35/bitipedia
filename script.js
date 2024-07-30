// Sayfa yüklendiğinde butonun metnini 'Dice!' olarak ayarlar
function initializeButtonLabel() {
    const searchButton = document.getElementById('searchButton');
    searchButton.innerHTML = 'Dice!';
}

// Arama kutusu içeriğine göre butonun etiketini günceller
function updateButtonLabel() {
    const searchBox = document.getElementById('searchBox');
    const searchButton = document.getElementById('searchButton');

    // Arama kutusu boşsa butonun metnini "Dice!" olarak ayarla
    if (searchBox.value.trim() === '') {
        searchButton.innerHTML = 'Dice!';
    } else {
        // Arama kutusu doluysa butonun metnini "Find!" olarak ayarla
        searchButton.innerHTML = 'Find!';
    }
}

// Rastgele bir kelime seçip gösterir
async function showRandomWord() {
    try {
        const response = await fetch('semantic.json');
        const words = await response.json();
        const wordKeys = Object.keys(words);
        
        if (wordKeys.length > 0) {
            const randomKey = wordKeys[Math.floor(Math.random() * wordKeys.length)];
            const wordDetails = words[randomKey];
            const resultDiv = document.getElementById('result');
            
            resultDiv.innerHTML = `
                <div class="word">
                    <h3>${randomKey}</h3>
                    <p class="type">${wordDetails.type}</p>
                </div>
                <div class="details">
                    <p>${wordDetails.description}</p>
                </div>
            `;
        } else {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<h3 class="error">No words available.</h3>';
        }
    } catch (error) {
        console.error('Error fetching the words:', error);
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '<h3 class="error">Error fetching words.</h3>';
    }
}

// Arama butonuna tıklandığında gerekli işlevi çağırır
async function searchWord() {
    const searchBox = document.getElementById('searchBox');
    const query = searchBox.value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = ''; // Clear previous result

    if (query === '') {
        // Arama kutusu boşsa rastgele kelime göster
        showRandomWord();
        return;
    }

    try {
        const response = await fetch('semantic.json');
        const words = await response.json();

        if (words[query]) {
            const wordDetails = words[query];
            resultDiv.innerHTML = `
                <div class="word">
                    <h3>${query}</h3>
                    <p class="type">${wordDetails.type}</p>
                </div>
                <div class="details">
                    <p>${wordDetails.description}</p>
                </div>
            `;
        } else {
            resultDiv.innerHTML = '<h3 class="error">No results found.</h3>';
        }
    } catch (error) {
        console.error('Error fetching the words:', error);
        resultDiv.innerHTML = '<h3 class="error">No results found.</h3>';
    }
}

$(function(){
    $('#searchBox').keypress(function(e){
        var txt = String.fromCharCode(e.which);
        console.log(txt + ' : ' + e.which);
        if(!txt.match(/[a-zA-ZçÇğĞıİöÖşŞüÜ]/) || txt.match(/[jJxXqQwW]/)) {
            return false;
        }
    });
});
