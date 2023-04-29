"use srict";

const API_URL = "https://api.github.com/users/";
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// Creates the card with the user information
const createUserCard = (user) => {
  const cardHTML = ` <div class="card">
        <div>
          <img
            src="${user.avatar_url}"
            alt="${user.name}"
            class="avatar"
          />
        </div>
        <div class="user-info">
          <h2>${user.name}</h2>
          <p>
            ${user.bio}    
          </p>

          <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
          </ul>

          <div id="repos">

          </div>
        </div>
      </div>`;

  main.innerHTML = cardHTML;
};

// Create card for 404 error
const createErrorCard = (message) => {
  const cardHTML = `    
    <div class='card'>
    <h1>${message}</h1>
    </div>
    `;
  main.innerHTML = cardHTML;
};

// Gets the API with thw user DATA
const getUser = async (username) => {
  try {
    const { data } = await axios(API_URL + username);

    createUserCard(data);
    console.log(data);
  } catch (err) {
    if (err.response.status == 404)
      createErrorCard("No profile with this username");
  }
};

// Event handler
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
