const API = "https://6ac3c5c2ae53bf25b80ef70a.mockapi.io/pets";

const emojiMap = {
  Dragon: "🐉",
  Unicorn: "🦄",
  Phoenix: "🔥",
  Fairy: "🧚",
  Griffin: "🦅"
};

async function loadPets() {
  try {
    const res = await fetch(API);
    const pets = await res.json();
    displayPets(pets);
  } catch (err) {
    console.log("Error loading pets:", err);
  }
}

function displayPets(pets) {
  const grid = document.getElementById("pets-grid");
  grid.innerHTML = "";

  pets.forEach(pet => {
    const card = document.createElement("div");
    card.className = "pet-card";
    card.innerHTML = `
      <div class="pet-emoji">${emojiMap[pet.type] || "✨"}</div>
      <h3>${pet.name}</h3>
      <p><strong>Type:</strong> ${pet.type}</p>
      <p><strong>Color:</strong> ${pet.color}</p>
      <p>${pet.description}</p>
      <button class="btn btn-danger" onclick="releasePet('${pet.id}')">Release 🕊️</button>
    `;
    grid.appendChild(card);
  });
}


document.getElementById("petForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newPet = {
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    color: document.getElementById("color").value,
    description: document.getElementById("description").value
  };

  try {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPet)
    });

    e.target.reset();
    document.getElementById("adoptForm").classList.remove("show");
    loadPets();
  } catch (err) {
    console.log("Error adding pet:", err);
  }
});
async function releasePet(id) {
  if (!confirm("Are you sure you want to release this pet?")) return;

  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadPets();
  } catch (err) {
    console.log("Error releasing pet:", err);
  }
}


document.getElementById("showFormBtn").addEventListener("click", () => {
  document.getElementById("adoptForm").classList.toggle("show");
});


loadPets();