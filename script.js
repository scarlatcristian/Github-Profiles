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

//
const addReposToCard = (repos) => {
  const reposEl = document.getElementById("repos");
  repos.slice(0, 10);

  repos.forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
};

// Gets the API with the user DATA
const getUser = async (username) => {
  try {
    const { data } = await axios(API_URL + username);

    createUserCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404)
      createErrorCard("No profile with this username");
  }
};

// Gets the API with the repos DATA
const getRepos = async (username) => {
  try {
    const { data } = await axios(API_URL + username + "/repos?sort=created");

    addReposToCard(data);
  } catch (err) {
    createErrorCard("Problem fetching repos");
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
