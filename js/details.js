const detailContainer = document.querySelector(".post-container-details");
const score = document.querySelector(".score-stars");


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

// console.log("id");

const url = "https://matshel.dev/vegancritic-api/wp-json/acf/v3/posts/" + id;
// const corsEnabledUrl = "https://noroffcors.herokuapp.com/" + url;


// fetches REST API

async function getPosts() {
    try {
        const response = await fetch(url);
        const getResults = await response.json();
        detailContainer.innerHTML = "";
        createHTML(getResults);
        // createScoreStars(getResults);
        createNewTitle(getResults);


      //  let starScore = getResults.acf.score;

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
            <div class="posts">
              <h2 class="title">${post.acf.title}</h2>
              
              <div class ="image-test"><div class="post-img"><img id="detailsImg" src="${post.acf.image_preview}" alt="${post.acf.title}" ></div></div>
              <h3 class="score">Score : ${post.acf.score} / 5</h3>
              <h3 class="place"><span class="at">@ </span>${post.acf.place}</h3>
              <p>${post.acf.information}</p>
              

            <div class="info-image">
                <img src="images/woman-238553_1280.jpg" alt="Round profile picture of Eva Normann" />
                  <div class="info-image-info">
                  <span class="info-image-name">Eva Normann</span>
                  <span class="info-image-date">${post.acf.date}</span>
                </div>
            </div>
          </div>`;     
}


// change page title to dish name

function createNewTitle(newTitle) {
    
    let newPageTitle = newTitle.acf.title;

    document.title = `Vegancritic | ${newPageTitle}`;
}

// score stars

// function createScoreStars(stars) {
  
// let starScore = stars.acf.score;

// if (starScore === 5) {
//   score.innerHTML =`Starx5`;
// }
// }



// function createScoreStars(stars) {

//   let assignStars = stars.acf.score;
  
//   if (assignStars === 5) {
//     score.innerHTML = `
//     <div class="score-stars" style="display:flex">
//     <i class="far fa-star"></i>
//     <i class="far fa-star"></i>
//     <i class="far fa-star"></i>
//     <i class="far fa-star"></i>
//     <i class="far fa-star"></i>
//   </div>`

// } 
  
// }


//   if (assignStars === 5) {
//     score.innerHTML = `
//     <div class="score-stars" style="display:flex">
//     <i class="far fa-star"></i>
//     <i class="far fa-star"></i>
//     <i class="far fa-star"></i>
//     <i class="far fa-star"></i>
//     <i class="far fa-star"></i>
//   </div>`

// } else if(assignStars === 4) {
// score.innerHTML = `
//   <div class="score-stars" style="display:flex">
//     <i class="far fa-star"></i>
//     <i class="far fa-star"></i>
//     <i class="far fa-star"></i>
//     <i class="far fa-star"></i>
//   </div>
//     `
//   } else {
//     score.innerHTML = ``;
//   }
