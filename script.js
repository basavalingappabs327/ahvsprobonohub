// ನಿಮ್ಮ ಗೂಗಲ್ ಆಪ್ಸ್ ಸ್ಕ್ರಿಪ್ಟ್ ವೆಬ್ ಆಪ್ ಲಿಂಕ್ ಅನ್ನು ಇಲ್ಲಿ ಹಾಕಿ
const apiURL = "https://script.google.com/macros/s/AKfycbxqXa9-lCwQuvGaJCe8FNVKhli_sFurWgay7SQypO3HMkTleJhDaX91gLHaylnlnAzE/exec";

const gridContainer = document.getElementById('linksGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const totalCountElement = document.getElementById('totalCount');

let itemsData = [];

// ಗೂಗಲ್ ಶೀಟ್‌ನಿಂದ ಡೇಟಾ ಫೆಚ್ (Fetch) ಮಾಡುವ ಫಂಕ್ಷನ್
async function fetchSheetData() {
    try {
        gridContainer.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: #666; padding: 20px;">ಡೇಟಾ ಲೋಡ್ ಆಗುತ್ತಿದೆ...</p>';
        
        const response = await fetch(apiURL);
        itemsData = await response.json();
        
        displayItems(itemsData);
    } catch (error) {
        console.error('Error fetching data:', error);
        gridContainer.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: red; padding: 20px;">ಡೇಟಾ ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಲಿಂಕ್ ಪರಿಶೀಲಿಸಿ.</p>';
    }
}

// ಕಾರ್ಡ್‌ಗಳನ್ನು ಡಿಸ್ಪ್ಲೇ ಮಾಡುವ ಫಂಕ್ಷನ್
function displayItems(data) {
    gridContainer.innerHTML = '';
    
    // ಒಟ್ಟು ಕೌಂಟ್ ಅಪ್ಡೇಟ್ ಮಾಡುವುದು
    totalCountElement.textContent = data.length;

    if (data.length === 0) {
        noResults.style.display = 'block';
        return;
    } else {
        noResults.style.display = 'none';
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <span>${item.title}</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
        `;

        // ಕ್ಲಿಕ್ ಮಾಡಿದಾಗ ಹೊಸ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ಲಿಂಕ್ ತೆರೆಯುವುದು
        card.addEventListener('click', () => {
            window.open(item.url, '_blank');
        });

        gridContainer.appendChild(card);
    });
}

// ಪುಟ ಓಪನ್ ಆದ ಕೂಡಲೇ ಡೇಟಾ ತರಿಸಿಕೊಳ್ಳುವುದು
fetchSheetData();

// ಸರ್ಚ್ ಬಾಕ್ಸ್‌ನಲ್ಲಿ ಟೈಪ್ ಮಾಡಿದಾಗ ಫಿಲ್ಟರ್ ಮಾಡುವ ಕೋಡ್
searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase().trim();
    
    const filteredItems = itemsData.filter(item => 
        item.title.toLowerCase().includes(searchText)
    );
    
    displayItems(filteredItems);
});