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
movieUrl="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&" +apiKey;
var imageUrl = "https://image.tmdb.org/t/p/w500"
