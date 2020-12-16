// All DOM Elements
//header elements
const searchBar = document.getElementById('search');
const searchButton = document.getElementById('search-button');
const randomButton = document.getElementById('random-button');
//main elements
const resultHeading = document.getElementById('result-heading');
const mealsContainer  = document.getElementById('meals');
const selectedMealContainer = document.getElementById('selected-meal');

// All Functions
// 1. Function to search meal from API and fetch the data
function searchMeal(e) {
    e.preventDefault();
    const term = searchBar.value;
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term.toLowerCase()}`)
            .then( result => result.json())
            .then( data => {
                resultHeading.innerHTML = `<h2 id="random-heading">Search results for '${term}'</h2>`;
                if(data.meals === null) {
                    resultHeading.innerHTML += `<p>There are no search results for '${term}'. Please try a different search</p>`;
                } else {
                    mealsContainer.innerHTML = data.meals.map( meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <a href="#selected-meal">
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                        </a>
                    </div>
                    ` ).join("");
                    mealsContainer.style.borderBottom = "1px solid var(--theme-color-2)";
                }
            });
    }else {
        alert('Please enter a valid search.')
    }
    // Clear search term
    searchBar.value = "";
}

// 2. Function to fetch the meal dtaa using meal ID
function getMealByID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(result => result.json())
        .then(data => {
            const meal = data.meals[0];
            console.log(meal);
            addMealToDOM(meal);
        })
}

// 3. Function to add more details of selected meal
function addMealToDOM(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]){
            ingredients.push({ingredient: meal[`strIngredient${i}`],measure: meal[`strMeasure${i}`] });
        }else {
            break;
        }
    }

    selectedMealContainer.innerHTML = `
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="selected-meal-info">
        ${meal.strArea ? `<h4>The food is: ${meal.strArea}</h4>`:false}
        ${meal.strCategory ? `<h4>It's category is: ${meal.strCategory}</h4>`:false}
    </div>
    <h3>Ingredients</h3>
    <ul>
        ${ingredients.map( data => `<li>${data.ingredient} <span>${data.measure}</span></li>` ).join("")}
    </ul>
    <h3>Instructions</h3>
    <p>${meal.strInstructions}</p>
    `
}

// 4. Function to get random meal
function getRandomMeal() {
    resultHeading.innerHTML = "";
    mealsContainer.innerHTML = "";
    mealsContainer.style.borderBottom = "0";
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(result => result.json())
        .then(data => {
            const randomMeal = data.meals[0];
            addMealToDOM(randomMeal);
        })
}


// All Event Listeners
// 1. Submit search by search button 
searchButton.addEventListener('click',searchMeal);

// 2. When clicking a meal
mealsContainer.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    })

    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealByID(mealID);
    }
} )

// 3. When clickig random button
randomButton.addEventListener('click',getRandomMeal);