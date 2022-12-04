// let result = document.getElementById("result")
var searchBtn = document.getElementById("search-btn");
var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var imageElement = document.getElementById("i")
var ingList = document.getElementById("ingred")
// var videoElement = document.getElementById("video")
//Movie Section
var movieSearchBtn = document.getElementById("movieSearch-btn")
var movieImageEl = document.getElementById("movieImage")
const apiKey="api_key=5632a8204cc4c02a4d9c1725e49763e3";
var movieUrl="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&" +apiKey;
var imageUrl = "https://image.tmdb.org/t/p/w500"

searchBtn.addEventListener("click", () => {
    let userInp = document.getElementById("user-inp").value; //******************Hopefully to add some way of detecting an error*********************
    if (userInp.length == 0){
        result.innerHTML = '<h3>Input field cannot be empty</h3>';
        console.log(userInp)
    }else{
     fetch(url + userInp)
       .then((response) => response.json())
       .then((data) => {
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
       })
     fetch(movieUrl).then(res => res.json()).then(data => {
        console.log(data)        
        //for(var i==0; i<data ) -- ***************can we do a loop to loop through the array and select random movies***********
        var myMovie = data.results[0];
        console.log(myMovie.title)            
                         
        //***Comments to be added but this is to basically get the movie data and display on the page */
        document.getElementById("movieTitle").textContent = myMovie.title
        document.getElementById("movieOverview").textContent = myMovie.overview
        imageUrl += myMovie.poster_path
        movieImageEl.setAttribute("src", imageUrl)    

                       
    })
   }
})


    
