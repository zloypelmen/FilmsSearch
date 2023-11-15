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
    });

    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const query = searchInput.value.trim();

        if (query !== '') {
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Результаты поиска:', data);
                })
                .catch(error => {
                    console.error('Ошибка при выполнении запроса:', error);
                });
        }
        else{

        }
    }
});
