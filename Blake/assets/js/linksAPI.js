//Full API Documentation available at https://rawg.io/apidocs

//Create a function to consume the RAWG APU and insert the
//games data into HTML elements in the #gamesResults
$(function () {
    //The code below is an AJAX (Asynchronus JavaScript And XML) request.
    //In the request, we will specify where to make the request, the type
    //of request, and what to do if the request is successful.
    $.ajax({
        //Where to make the request:
        url: 'https://api.rawg.io/api/games?page_size=12&page=1&key=87c0eb62c1c746a3a212cdb582f0a38d',

        //Which type of request this is (GET - Also known as "read" functionality):
        method: 'GET',

        //What to do if the request is successful:
        success: function (data) {

            //Log the results
            console.log(data);

            //Since we know that RAWG returns a collection of results, we can console.table the data.results:
            console.table(data.results);

            //Store the results in a variable
            var games = data.results;

            //Capture the output element #gamesResults
            var gamesResults = document.getElementById('gamesResults');

            //Use .map() to generate divs and insert them into our output element with .innerHTML
            games.map(game => 
                gamesResults.innerHTML +=
                `<div class="col-lg-4 col-md-6 col-sm-12 p-3">
                    <div class="image" style="background-image: url(${game.background_image}); position: relative;
                    background-size: cover; background-position: center;">
                        <div class="info">
                            <h3>${game.name}</h3>
                            <hr>
                            <p>Release Date: ${game.released}</p>
                            <p>ESRB: ${game.esrb_rating.name}</p>
                            <p>Rating: ${game.rating}/${game.rating_top}</p>
                            <p>Genres: ${game.genres.map(g => ` ${g.name}`)}</p>
                        </div>
                    </div>
                </div>`
            );

            //On mouseenter, toggle on the visible class for the info div
            $('.image').mouseenter(function () {
                $(this).children('.info').toggleClass('visible')
            });
            //On mouseleave, toggle off the visible class for the info div
            $('.image').mouseleave(function () {
                $(this).children('.info').toggleClass('visible')
            });
        }
    });
})