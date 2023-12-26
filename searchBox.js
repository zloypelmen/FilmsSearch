document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const clearInput = document.getElementById('clearInput');
    const apiKey = '1e35f6bb';

    searchInput.addEventListener('input', function () {
        if (searchInput.value.trim() !== '') {
            clearInput.style.display = 'flex';
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
            clearPreviousResults();
            hideResultContainer();
            performSearch();
        }
    });

    function performSearch() {
        const query = searchInput.value.trim();

        if (query !== '') {
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {

                    clearPreviousResults();

                    if (data.Response == "False") {
                        const titleError = document.createElement('p');
                        titleError.textContent = data.Error;

                        const errorContainer = document.getElementById('errorContainer');
                        errorContainer.style.display = 'flex';
                        errorContainer.appendChild(titleError);

                        console.error('Ошибка при выполнении запроса:', error);
                    }
                    else {
                        const resultContainer = document.getElementById('resultContainer');
                        resultContainer.style.display = 'flex';

                        data.Search.forEach(movie => {
                            const movieCard = document.createElement('div');
                            movieCard.classList.add('shadow-box'); 
        
                            const posterElement = document.createElement('img');
                            posterElement.src = movie.Poster;
    
                            const titleElement = document.createElement('h4');
                            titleElement.textContent = movie.Title;
        
                            const YearElement = document.createElement('p');
                            YearElement.textContent = `${movie.Year}`;
        
                            const resultContainer = document.getElementById('resultContainer');
                            resultContainer.style.display = 'flex'; 
        
                            movieCard.appendChild(posterElement);
                            movieCard.appendChild(titleElement);    
                            movieCard.appendChild(YearElement);
        
                            resultContainer.appendChild(movieCard);
                        });

                        console.log('Результаты поиска:', data);
                    }

                })
                .catch(error => {
                    console.error('Ошибка при выполнении запроса:', error);
                });
        }
        else {
            const plotElement = document.createElement('p');
            plotElement.textContent = 'Введите название фильма! ';

            const resultContainer = document.getElementById('errorContainer');
            resultContainer.style.display = 'flex';
            resultContainer.appendChild(plotElement);
        }
    }

    function clearPreviousResults() {
        const resultContainer = document.getElementById('resultContainer');
        const errorContainer = document.getElementById('errorContainer');
        while (resultContainer.firstChild) {
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


});
