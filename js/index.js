const buttonPrevious = document.querySelector("#button-previous");
const buttonNext = document.querySelector("#button-next");
const postsContainer = document.querySelector(".blog-latest");

const apiUrl = "https://matshel.dev/vegancritic-api/wp-json/acf/v3/posts";

let length = 3;
let offset = 0;


// fetches the REST API
async function fetchApi(url) {
    try {
        const data = await fetch(
            url + `?per_page=${length}&offset=${offset}&_embed`
        );
        const json = await data.json();

        // resets loader
    
        postsContainer.innerHTML = "";
        
        createHTML(json);

        // let numberOfPosts = json.length;

        // shows hides buttons based on post offsets

        if (offset === 0) {
            buttonPrevious.style.display = "none";
        } else {
            buttonPrevious.style.display = "block";
        }
        // if (json.length < 3) {
        //     buttonNext.style.display = "none";
        // } else {
        //     buttonNext.style.display = "block";
        // }
        if (offset > json.length + 5) {
            buttonNext.style.display = "none";
        } else {
            buttonNext.style.display = "block";
        }


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
                <div class="posts-img"><img src="${post.acf.image_preview}" alt="" data-original="${post.acf.image_original}"></div>
                <div class="score">${post.acf.stars}</div>
                <h2>${post.acf.title}</h2>
                <div class="container-button" aria-label="View more"> <a href="details.html?id=${post.id}"><button class="view-more">View more</button></a></div>
            </div>
        `
    });
}


// next and previous button listeners
buttonPrevious.addEventListener("click", () => {
    if (offset >= 1) {
        offset -= 1;
    }
    fetchApi(apiUrl);
});

buttonNext.addEventListener("click", () => {
    offset += 1;
    fetchApi(apiUrl);
});

fetchApi(apiUrl);