// DOM Elements
const searchBar = document.getElementById('filter');
const postContainer = document.getElementById('post-container');
const loader = document.getElementById('loader');
// variables
let limit = 5;
let page = 1;
let colorIndex = -1;
let newIndex = -1;
let colorPicker = 0;
// Arrays
const allPosts = [];
const postColorIndexes = [];
let filteredPosts = [];
const colors = [{"font":"black","body":getComputedStyle(document.documentElement).getPropertyValue('--color-1')},{"font":"white","body":getComputedStyle(document.documentElement).getPropertyValue('--color-2')},{"font":"white","body":getComputedStyle(document.documentElement).getPropertyValue('--color-3')},{"font":"white","body":getComputedStyle(document.documentElement).getPropertyValue('--color-4')},{"font":"white","body":getComputedStyle(document.documentElement).getPropertyValue('--color-5')}];




// All Functions
// 1 - Function to get new Posts
async function getPosts(){
    // 1 - show loader to wait for data
    document.documentElement.style.setProperty('--loader-color',colors[Math.floor(Math.random() * colors.length)].body);
    loader.classList.add('show');
    // 2 - call fetch for data
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await response.json();
    // 3 - put data into main array
    allPosts.push(await data);
    // 4 - Generate new colorCodes
    bringNewColors();
    // 5 - Give posts new colorCodes
    for (let index = 0; index < 5; index++) {
        allPosts[allPosts.length - 1][index].colorCode = postColorIndexes[colorPicker];
        colorPicker++;
    }
    // 6 - hide / remove loader and show the new posts
    setTimeout( () => {
        loader.classList.remove('show');
        showPosts(allPosts);
    }, 1000);
}

// 2 - Function to show all posts
function showPosts(array){
    // 1 - clean main container for posts
    postContainer.innerHTML = '';
    // 2 - read the array to be posted
    array.forEach(postList => { // In array
        postList.forEach(post => { // reach to exact data
            // 3 - create new element for post
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            // 4 - set properties and content
            postElement.style.color = colors[post.colorCode].font;
            postElement.style.backgroundColor = colors[post.colorCode].body;
            postElement.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
            `
            // 4 - display the posts in the array
            postContainer.appendChild(postElement);
        })
    });
}

// 3 - Function to show filtered posts
function showFilteredPosts(array){
    // 1 - clean main container for posts
    postContainer.innerHTML = '';
    // 2 - read the array to be posted
    array.forEach(post => { // reach to exact data
        // 3 - create new element for post
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        // 4 - set properties and content
        postElement.style.color = colors[post.colorCode].font;
        postElement.style.backgroundColor = colors[post.colorCode].body;
        postElement.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
        `
        // 4 - display the posts in the array
        postContainer.appendChild(postElement);
    });
}

// 3 - Function to fetch new posts at the end of the page
function fetchNewPosts() {
    let {scrollTop, clientHeight,clientWidth, scrollHeight} = document.documentElement;
    // check condition if all posts are not filled and search bar should also empty
    if (allPosts.length < 20 && searchBar.value === "") {
        if(clientWidth <= 425  && scrollTop + clientHeight >= scrollHeight-100) { // For Mobile
            page++;
            getPosts();
        } else if(clientWidth > 425  && scrollTop + clientHeight === scrollHeight) { // Desktop
            page++;
            getPosts();
        }
    }
}




// 4 - Function to filter posts
function filterAllPosts() {
    // check condition either is there any word or not in the bar
    if (searchBar.value != null) {
        const word = searchBar.value;
        filteredPosts = [];
        allPosts.forEach(postList => postList.forEach(post => {
            // check either the word is their in the title or the body
            if(post.title.includes(word)|| post.body.includes(word)){
                // if yes, then put it in the filter post array
                filteredPosts.push(post);
            }
        }));
        // show it to the DOM
        showFilteredPosts(filteredPosts);
    }    
}

// 5 - Function for filling postColorIndexes from color codes
function bringNewColors() {
    for (let index = 0; index < 5; index++) {
        while(newIndex === colorIndex) {
            newIndex = Math.floor(Math.random() * colors.length);
        }
        colorIndex = newIndex;
        postColorIndexes.push(colorIndex);
    }
}

// All Event Linteners
// 1 - Load and display new posts when scroll reaches to end of the page
window.addEventListener('scroll', fetchNewPosts);
// 2 - when filtering show filtered posts
searchBar.addEventListener('input',filterAllPosts);

// Init Functions
// get posts at the beginning
getPosts();