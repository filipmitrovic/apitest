$(function () {
    // länka form news
    $('#search-form').submit(function (e) {
        e.preventDefault();
        var searchTerm = $('#source-inputs').val();
        var weatherInput = $('#weather-input').val();
        getRequest(searchTerm);
    });
    // Hämtar källor från News Api och visar dom i en select...
    function sources() {
        var sourceUrl = 'https://newsapi.org/v2/sources?apiKey=3cd40c4b9b46428d8ae7cc3b641fe527';
        $.getJSON(sourceUrl, function (sources) {
            $.each(sources.sources, function (i, value) {
                var selectedSources = `
                
                <option value="${value.id}">${value.name}</option>
                `;
                $('#source-inputs').append(selectedSources);
            });
        });
    }
    sources();
    //hämta data news
    function getRequest(source) {
        var url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=3cd40c4b9b46428d8ae7cc3b641fe527`;
     
        $.getJSON(url, function (data) {

            showResults(data.articles);
        });
    };
    //visa data news
    function showResults(data) {
        $('#search-results').html('');
        $.each(data, function (i, value) {
            var template = `
                    <div class="item">
                        <h3>${value.title}</h3>
                        <h6>${value.author}</h6>
                        <p>${value.description}</p>
                        <a href="${value.url}" target="_blank" class="link">Read more</a>
                    </div>
                `;
            $('#search-results').append(template);
        });
    }
    // // länka form weather
    $('#search-weather').submit(function (e) {
        e.preventDefault();
        var weatherInput = $('#weather-input').val();
        weather(weatherInput);
    });
    // hämta data weather
    function weather(input) {
        var url = 'http://api.apixu.com/v1/current.json?';
        var rules = {
            key: '17b8d13c58f942dcbec94043181104',
            q: input,
        };
        $.getJSON(url, rules, function (data) {
            console.log('weather data ', data.current.feelslike_c
        );
            weather_viwer(data);
        });
    }
    // //visa data weather
    function weather_viwer(data) {
        $('#weather_search-results').html('');
        $.each(data, function (i, value) {
            console.log(value)
            var template = `
            <div class="item">
                <h3>${value.name}</h3>
                <h6>${value[i].current}</h6>
                <p>${value}</p>
            </div>
        `;
            $('#weather_search-results').append(template);
        });
    }
});