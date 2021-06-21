let mainContainer = document.querySelector(".main-container");
let loadMoreBtn = document.querySelector(".load-more-button");

let numberOfPostsShown = 4;

function renderPosts(num) {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      mainContainer.innerHTML = "";
      numberOfPostsShown = num;
      data.map((post, index) => {
        if (index < num) {
          mainContainer.innerHTML += createPost(post);
        }
      });
      if (num === data.length) {
        loadMoreBtn.style.display = "none";
      }
    })
    .catch((err) => console.log(error));
}

function createPost(post) {
  return `<div class="card">
  <div class="card-title">
    <div class="card-profile-img">
     <img src="${post.profile_image}" alt="...">
      <div>
        <p>${post.name}</P>
        <span>${new Date(post.date).getDate()} ${new Date(post.date)
    .toLocaleString("default", { month: "long" })
    .substring(0, 3)} ${new Date(post.date).getFullYear()}</span>
      </div>
    </div>
    <img src="./icons/${post.source_type}.svg" class="social-icon" alt="...">
  </div> 
  <div class="card-body" style="background-image: url(${post.image})">
    
  </div> 
  <div class="card-description">
    <p><a href="${post.source_link}" target="_blank">#Lorem </a>${
    post.caption
  }</P>
  </div>  
  <div class="card-likes">
   <img src="./icons/heart.svg" alt="...">
   <span>${post.likes}</span>
  </div> 
  
  </div>`;
}
renderPosts(numberOfPostsShown);

loadMoreBtn.addEventListener("click", () => {
  renderPosts(numberOfPostsShown + 4);
});
