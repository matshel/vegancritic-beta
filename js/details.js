const detailContainer = document.querySelector(".post-container-details");
const score = document.querySelector(".score-stars");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const Url = "https://matshel.dev/vegancritic-api/wp-json/acf/v3/posts/" + id;


// fetches REST API
async function getPosts() {
    try {
        const response = await fetch(Url);
        const getResults = await response.json();
        detailContainer.innerHTML = "";
        createHTML(getResults);
        createNewTitle(getResults);

        // modal
        const modalImage = document.querySelector(".modal-image");
        let img = document.querySelector("#detailsImg");
        const closeButton = document.querySelector(".close");

        img.onclick = function () {
            modal.style.display = "block";
            modalImage.src = this.src;
          };

          closeButton.onclick = function () {
            modal.style.display = "none";
          };

          window.onclick = function (event) {
            if (event.target === modal) {
              modal.style.display = "none";
            }
          };  
    }

    catch(error) {
        console.log(error);
        detailContainer.innerHTML = errorMessage("Oops! An error occurred while gathering the post");
    }
}

getPosts();


// creates posts
function createHTML(post) {
        detailContainer.innerHTML +=`
            <div class="post-details">
                <div class ="image-details"><div class="post-img"><img id="detailsImg" src="${post.acf.image_original}" alt="${post.acf.title}" ></div></div>
                <div class="score">${post.acf.stars}</div>
                <h2 class="title">${post.acf.title}</h2>
                <h2 class="place">From ${post.acf.place}</h2>
                <p>${post.acf.information}</p>
                <div class="info-image">
                  <img src="images/eva-normann-profile-image.jpg" alt="Round profile picture of Eva Normann" />
                  <div class="info-image-info">
                      <div class="info-image-name">Eva Normann</div>
                      <div class="info-image-date">${post.acf.date}</div>
                  </div>
                </div>
            </div>`;     
}


// change page title to dish name
function createNewTitle(newTitle) {
    
    let newPageTitle = newTitle.acf.title;

    document.title = `${newPageTitle} | Vegancritic `;
}

