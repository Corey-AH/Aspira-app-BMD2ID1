
//Goals Database
const goalList = document.getElementById('goalList');

fetch('/js/data.json')         
  .then(response => response.json()) 
  .then(data => {
    data.forEach(goal => {
      const percent = Math.round((goal.progress / goal.total) * 100);

      const link = document.createElement('a');
      link.href = '/goals-html/current-goal.html';
      link.className = 'goal-link';

      const goalCard = document.createElement('div');
      goalCard.className = 'active-goal green';

      goalCard.innerHTML = `
        <h3>${goal.title}</h3>
        <h5>${goal.progress} of ${goal.total} Complete</h5>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${percent}%;"></div>
        </div>
      `;

      link.appendChild(goalCard);   
      goalList.appendChild(link);   
    });
  });




//Mentors Database
fetch('/js/mentors.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('#mentors'); 

    data.forEach(person => {
      const card = document.createElement('div');
      card.classList.add('favourited-cards', 'green');

      card.innerHTML = `
        <div class="favourited-cards-content">
          <img src="${person.image}" alt="${person.name}">
          <div class="favourite-content">
            <h4>${person.name}</h4>
            <div class="favourited-details">
              <img src="/icons/phone-white.png" alt="Phone">
              <p>${person.phone}</p>
            </div>
            <div class="favourited-details">
              <p>${person.career}</p>
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  });







// Leaderboard Database
const leaderboardList = document.querySelector('.leaderboard-list');

fetch('/js/leaderboard.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(person => {
      const item = document.createElement('div');
      item.className = 'leaderboard-items green';

      item.innerHTML = `
        <img src="${person.placement}" alt="${person.name}" class="placement-images">
        <div class="leader-info">
          <img src="${person.image}" alt="${person.name}" class="profile-images">
          <h3>${person.name}</h3>
        </div>
        <section class="leaderboard-progress">
         <div class="goals-vertical-progress-bar">
          <div class="goals-vertical-progress-fill" style="height: ${person.progress}%;"></div>
        </div>
        <p>${person.completed} %</p>
        </section>
       
      `;

      leaderboardList.appendChild(item);
    });
  });




//Upload New Goal
document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById("addPrototyping");
  const overlay = document.getElementById("tickOverlay");

  if (addBtn && overlay) {
    addBtn.addEventListener("click", function (e) {
      e.preventDefault();

      overlay.style.display = "flex";
      localStorage.setItem("addPrototyping", "true");

      setTimeout(function () {
        window.location.href = "/goals-html/current-goal.html";
      }, 1500);
    });
  }
});



window.addEventListener("load", function () {
  const shouldAdd = localStorage.getItem("addPrototyping");

  if (shouldAdd === "true") {
    const suggestionCards = document.querySelectorAll(".suggestions-card");
    suggestionCards.forEach(function (card) {
      if (card.innerText.includes("Prototyping")) {
        card.remove();
      }
    });

    const stepsContainer = document.querySelector(".current-steps");
    const newStep = document.createElement("div");
    newStep.className = "current-step-cards green";
    newStep.innerHTML = `
      <h3>Learn <br> Prototyping</h3>
      <img src="/icons/progress-bar-0.png" alt="Progress Bar 0%" class="current-progress-bar">
    `;
    stepsContainer.appendChild(newStep);

    localStorage.removeItem("addPrototyping");
  }
});




//Send Message
function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();

  if (message !== "") {
    const chatBox = document.getElementById("chat-box");

    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "sent");
    newMessage.innerHTML = `
      <img src="/assets/person-07.png" class="profile">
      <div class="text-bubble">${message}</div>
    `;

    chatBox.appendChild(newMessage);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

document.getElementById("messageInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
