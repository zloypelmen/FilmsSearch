document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const clearInput = document.getElementById('clearInput');
    const apiKey = '1e35f6bb'; 

    searchInput.addEventListener('input', function () {
        if (searchInput.value.trim() !== '') {
            clearInput.style.display = 'block';
        } else {
            clearInput.style.display = 'none';
        }
    });

    clearInput.addEventListener('click', function () {
        searchInput.value = '';
        clearInput.style.display = 'none';
        searchInput.focus();

        clearPreviousResults();
    });

    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            hideErrorContainer()
            performSearch();
        }
    });

    function performSearch() {
        const query = searchInput.value.trim();

        if (query !== '') {
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {

                    clearPreviousResults();

                    if(data.Response == "False"){
                        const titleError = document.createElement('p');
                        titleError.textContent = data.Error; 

                        const errorContainer = document.getElementById('errorContainer');
                        errorContainer.style.display = 'flex'; 
                        errorContainer.appendChild(titleError);
                    
                        console.error('Ошибка при выполнении запроса:', error);
                    }
                    else{
                        const posterElement = document.createElement('img');
                        posterElement.src = data.Poster;

                        const titleElement = document.createElement('h2');
                        titleElement.textContent = data.Title;
    
                        const plotElement = document.createElement('p');
                        plotElement.textContent = `${data.Plot}`;
    
                        const resultContainer = document.getElementById('resultContainer');
                        resultContainer.style.display = 'flex'; 
                        resultContainer.appendChild(posterElement);
                        resultContainer.appendChild(titleElement);
                        resultContainer.appendChild(plotElement);
                    
                    console.log('Результаты поиска:', data);
                    }
                    
                })
                .catch(error => {   
                    hideResultContainer();

                    const titleError = document.createElement('p');
                    titleError.textContent = error; 

                    const errorContainer = document.getElementById('errorContainer');
                    errorContainer.style.display = 'flex'; 
                    errorContainer.appendChild(titleError);
                    
                    console.error('Ошибка при выполнении запроса:', error);
                });
        }
        else {
            const plotElement = document.createElement('p');
            plotElement.textContent = 'NO INFO';

            const resultContainer = document.getElementById('resultContainer');
            resultContainer.style.display = 'flex'; 
            resultContainer.appendChild(plotElement);
        }
    }

    function clearPreviousResults() {
        const resultContainer = document.getElementById('resultContainer');
        const errorContainer = document.getElementById('errorContainer');
        while (resultContainer.firstChild ) {
            resultContainer.removeChild(resultContainer.firstChild);
        }
        while (errorContainer.firstChild) {
            errorContainer.removeChild(errorContainer.firstChild);
        }
    }

    function hideResultContainer() {
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.style.display = 'none';
    }

    function hideErrorContainer() {
        const resultContainer = document.getElementById('errorContainer');
        resultContainer.style.display = 'none';
    }
});
