const postsContainer = document.querySelector(".posts-container");
const togglePosts = document.querySelector("#button-toggle-posts");

const apiUrl = "https://matshel.dev/vegancritic-api/wp-json/acf/v3/posts";

let length = 10;


// fetches REST API 
async function fetchApi(url) {
    try {
        const response = await fetch(
            url + `?per_page=${length}&_embed`
        );
        const getResults = await response.json();
        postsContainer.innerHTML = ""; 
        createHTML(getResults);
        
    } catch (error) {
        console.log(error);
        postsContainer.innerHTML = errorMessage("Oops! An error occurred while gathering the post");
    }
}

fetchApi("https://matshel.dev/vegancritic-api/wp-json/acf/v3/posts/");


// creates posts
function createHTML(posts) {
    posts.forEach(function(post) {
        postsContainer.innerHTML +=`
            <div class="post">
                <div class="post-img"><img src="${post.acf.image_preview}" alt="${post.acf.title}" </div>
                <div class="score">${post.acf.stars}</div>
                <h2>${post.acf.title}</h2>
                <a href="details.html?id=${post.id}"><button class="view-more" aria-label="View more">View more</button></a> 
            </div>`
    });
}


// toggles to show more or less posts (100 is max from wp)
togglePosts.addEventListener("click", () => {

    if(length === 10) {
        length = 100;
        fetchApi(apiUrl);
        togglePosts.innerHTML = `
        Show less
    `
    } else if (length === 100) {
        length = 10;
        fetchApi(apiUrl);
        togglePosts.innerHTML = `
        Show more
    `
    }
});


