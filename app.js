var searchBtn = document.getElementById("search-btn");
var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var imageElement = document.getElementById("i")
var ingList = document.getElementById("ingred")
// var videoElement = document.getElementById("video")
//Movie Section
const movieInp = document.getElementById("movie-inp")
const movieImageEl = document.getElementById("movieImage")
const apiKey="api_key=5632a8204cc4c02a4d9c1725e49763e3";
const movieUrl="https://api.themoviedb.org/3";
let imageUrl = "https://image.tmdb.org/t/p/w500"

searchBtn.addEventListener("click", async() => {
    let userInp = document.getElementById("user-inp").value; //******************Hopefully to add some way of detecting an error*********************
    if (userInp.length == 0){
        result.innerHTML = '<h3>Input field cannot be empty</h3>';
        console.log(userInp)
    }else{
        let response = await fetch(url + userInp);
        data = await response.json(); 
        let myMeal = data.meals[0];
        console.log(myMeal)
        console.log(myMeal.strMealThumb)    
        console.log(myMeal.strMeal)
        var steps = (`${myMeal.strInstructions}`)
        var count = 1;
        var ingredients = [];
        for (var i in myMeal){
            var ingredient = "";
            var measure ="";
            if (i.startsWith("strIngredient")&& myMeal [i]){
                ingredient += myMeal[i];
                measure = myMeal["strMeasure" + count];
                count+=1;
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
          // Create ul 
          let ingr = document.createElement("ul")
          // loop to update and save ingredients
         ingredients.forEach((i) => {
             var item = document.createElement("li");
             item.innerText = i;
             ingr.appendChild(item);
             ingList.appendChild(ingr);
         })
           // code to display image element
        imageElement.setAttribute("src", myMeal.strMealThumb)

        //code to get the instructions
        document.getElementById("instructions").textContent = steps

        //code to change meal name
        document.getElementById("mealName").textContent = `${myMeal.strMeal}`

        //code to change cuisine
        document.getElementById("cuisine").textContent = myMeal.strArea

        // // code to display video element
        // imageElement.setAttribute("src", myMeal.strYoutube)
       
        let myMovies = await getMovies();
        // Shuffle array
        const shuffled = myMovies.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6)
        selected.forEach(showMovie)
        //  displayMovies(myMovies);
        }
})

async function getMovies() {
    const movie_catergory ={"popularity": "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&",
                            "comedy":"/discover/movie?with_genres=35&sort_by=vote_average.desc&vote_count.gte=10&", 
                            "drama": "/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&"}

    let userChoice = document.getElementById("movie-inp").value

    let response = await fetch(movieUrl+movie_catergory[userChoice]+apiKey);
    let data = await response.json();
        console.log(data);
        var myMovies = data.results;
        console.log(myMovies[0].title);
        return myMovies;
    
}

// function displayMovies(myMovies) {
//     document.getElementById("movieTitle").textContent = myMovie[0].title;
//     document.getElementById("movieOverview").textContent = myMovie[0].overview;
//     imageUrl += myMovie[0].poster_path;
//     movieImageEl.setAttribute("src", imageUrl);
// }


    

    
    function showMovie(myMovie){
        const el = document.createElement("div")
        const movieTitle = document.createElement("h4");
        const movieImage = document.createElement("img");
        const movieOverview = document.createElement("h4");

        movieTitle.innerHTML = myMovie.title;        
        movieImage.setAttribute("src", imageUrl + myMovie.poster_path);
        movieOverview.innerHTML = myMovie.overview;

        el.appendChild (movieTitle);
        el.appendChild (movieImage);
        el.appendChild (movieOverview);

        document.getElementById("movieSection").appendChild (el);
             
        }



// 1. Pull data with one click fix async
// 2. Pull more than one movie get error handling
// 3. Search types: Popularity, Kids, date in theatre
