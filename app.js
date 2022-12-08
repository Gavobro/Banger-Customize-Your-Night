// Variable declartion for the Meal Section
var searchBtn = document.getElementById("search-btn");
var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var imageElement = document.getElementById("i")
var ingList = document.getElementById("ingred")
//Variable Declaration for the Movie Section
const movieInp = document.getElementById("movie-inp")
const movieImageEl = document.getElementById("movieImage")
const apiKey = "api_key=5632a8204cc4c02a4d9c1725e49763e3";
const movieUrl = "https://api.themoviedb.org/3";
let imageUrl = "https://image.tmdb.org/t/p/w500"


searchBtn.addEventListener("click", async () => {
    let userInp = document.getElementById("user-inp").value;
    if (userInp.length == 0) {
console.log(user.inp);

    } else {
        searchBtn.disabled = false;
        let response = await fetch(url + userInp);
        data = await response.json();
//Gets the Random recipe from the Api 
        var randomIndex = Math.floor(Math.random() * data.meals.length);
        let myMeal = data.meals[randomIndex];
        showMeals(myMeal);

        let myMovies = await getMovies();
        // Shuffle array
        const shuffled = myMovies.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6)
        document.getElementById("movieSection").innerHTML = "";
        selected.forEach(showMovie)

    }
})

function showMeals(myMeal) {
    console.log(myMeal);
    console.log(myMeal.strMealThumb);
    console.log(myMeal.strMeal);
    var steps = (`${myMeal.strInstructions}`);
    var count = 1;
    var ingredients = [];
    for (var i in myMeal) {
        var ingredient = "";
        var measure = "";
        if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient += myMeal[i];
            measure = myMeal["strMeasure" + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
        }
    }
    // Create ul 
    let ingr = document.createElement("ul");
    // attempt 2 for loop
    ingredients.forEach((i) => {
        var item = document.createElement("li");
        item.innerText = i;
        ingr.appendChild(item);
        ingList.appendChild(ingr);
    });
    // code to display image element
    imageElement.setAttribute("src", myMeal.strMealThumb);

    //code to get the instructions
    document.getElementById("instructions").textContent = steps;

    //code to change meal name
    document.getElementById("mealName").textContent = `${myMeal.strMeal}`;

    //code to change cuisine
    document.getElementById("cuisine").textContent = myMeal.strArea;


 
ingr.style.justifyItems='left';
   ingr.style.color='red';

   
}

async function getMovies() {
    const movie_catergory = {
        "popularity": "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&",
        "comedy": "/discover/movie?with_genres=35&sort_by=vote_average.desc&vote_count.gte=10&",
        "drama": "/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&"
    }

    let userChoice = document.getElementById("movie-inp").value

    let response = await fetch(movieUrl + movie_catergory[userChoice] + apiKey);
    let data = await response.json();
    console.log(data);
    var myMovies = data.results;
    console.log(myMovies[0].title);
    return myMovies;

}
function showMovie(myMovie) {
    const el = document.createElement("div")
    const movieTitle = document.createElement("h4");
    const movieImage = document.createElement("img");
    const movieOverview = document.createElement("h4");

    movieTitle.innerHTML = myMovie.title;
    movieImage.setAttribute("src", imageUrl + myMovie.poster_path);
    movieOverview.innerHTML = myMovie.overview;

    el.appendChild(movieTitle);
    el.appendChild(movieImage);
    el.appendChild(movieOverview);

    document.getElementById("movieSection").appendChild(el);

    //Styling for the elements created in JS

    movieTitle.style.color = 'black';
    movieTitle.style.fontSize = '40px';
    movieTitle.style.textAlign = 'center';
    movieTitle.style.marginLeft = '45%';
    movieTitle.style.display = 'flex';
    movieTitle.style.textShadow = '0 0 3px #FF0000, 0 0 5px #0000FF';


    movieImage.style.height = '600px';
    movieImage.style.width = 'auto';
    movieImage.style.paddingLeft = '40px';
    movieImage.style.marginLeft = '38%';
    movieImage.style.boxShadow = '0px 0px 5px rgba(0,0,0,.3)';
    movieImage.style.padding = '7px';
    movieImage.style.transform = '(-50%,-50%)';
    movieImage.style.perspective = '1200';
    movieImage.style.borderBlockColor = 'black';
    movieImage.style.hover = ' box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5)';
    movieImage.style.display = 'flex';
    movieImage.style.flex = '33.33%';
    movieImage.style.padding = '5px';

    movieOverview.style.textAlign = 'left';
    movieOverview.style.fontSize = '21px';
    movieOverview.style.color = 'black';
}



