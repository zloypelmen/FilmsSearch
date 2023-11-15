document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const clearInput = document.getElementById('clearInput');

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
        // Здесь можно добавить логику отправки запроса и отображения результатов
        console.log('Выполняется поиск для запроса: ', query);
    }
});
