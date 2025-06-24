const API_BASE_URL = "http://localhost:3000/api";
const dogForm = document.getElementById("dogForm");
const dogsList = document.getElementById("dogsList");
const topDogs = document.getElementById("topDogs");
const formStatus = document.getElementById("formStatus");

const a =  fetch("http://localhost:3000/api/dogs")
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);

console.log(a);

// Cadastrar novo cachorro
dogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();

  if (!name) {
    showStatus("Por favor, digite um nome válido", "error");
    return;
  }

  try {
    showStatus("Cadastrando...", "loading");

    const response = await fetch(`${API_BASE_URL}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar");
    }

    showStatus("Cachorro cadastrado com sucesso!", "success");
    dogForm.reset();
    loadDogs();
    loadTopDogs();
  } catch (error) {
    console.error("Erro:", error);
    showStatus(`Erro: ${error.message}`, "error");
  }
});

// Carregar lista de cachorros
async function loadDogs() {
  try {
    dogsList.innerHTML = '<div class="loading">Carregando...</div>';

    const response = await fetch(`${API_BASE_URL}/dogs`);

    // if (!response.ok) {
    //   throw new Error("Erro ao carregar dados");
    // }

    const dogs = await response.json();

    dogsList.innerHTML = "";

    if (dogs.length === 0) {
      dogsList.innerHTML =
        '<div class="status-message">Nenhum cachorro cadastrado ainda.</div>';
      return;
    }

    dogs.forEach((dog) => {
      renderDogCard(dog, dogsList, true);
    });
  } catch (error) {
    console.error("Erro:", error);
    dogsList.innerHTML = `<div class="status-message error">Erro ao carregar: ${error.message}</div>`;
  }
}

// Carregar top 3
async function loadTopDogs() {
  try {
    topDogs.innerHTML = '<div class="loading">Carregando...</div>';

    const response = await fetch(`${API_BASE_URL}/dogs/votes`);

    if (!response.ok) {
      throw new Error("Erro ao carregar dados");
    }

    const topDogsList = await response.json();

    topDogs.innerHTML = "";

    if (topDogsList.length === 0) {
      topDogs.innerHTML =
        '<div class="status-message">Nenhum voto registrado ainda.</div>';
      return;
    }

    topDogsList.forEach((dog) => {
      renderDogCard(dog, topDogs, false);
    });
  } catch (error) {
    console.error("Erro:", error);
    topDogs.innerHTML = `<div class="status-message error">Erro ao carregar top 3: ${error.message}</div>`;
  }
}

// Renderizar card do cachorro
function renderDogCard(dog, container, showVoteButton = true) {
  const card = document.createElement("div");
  card.className = "dog-card";
  card.innerHTML = `
        <img src="${dog.image}" alt="${dog.name}" class="dog-image">
        <div class="dog-info">
            <div class="dog-name">${dog.name}</div>
            <div>Votos: ${dog.votos || 0}</div>
        </div>
        <div class="dog-actions">
            ${
              showVoteButton
                ? `<button class="vote-btn" data-id="${dog.name}">Votar</button>`
                : ""
            }
            <button class="delete-btn" data-name="${dog.name}">Excluir</button>
        </div>
    `;

  container.appendChild(card);

  if (showVoteButton) {
    card.querySelector(".vote-btn").addEventListener("click", async () => {
      await voteForDog(dog.name);
    });
  }

  // Adiciona o evento de clique para o botão de exclusão
  card.querySelector(".delete-btn").addEventListener("click", async () => {
    await deleteDog(dog.name);
  });
}

// Função para deletar um cachorro (NOVA)
async function deleteDog(dogName) {
  if (!confirm(`Tem certeza que deseja excluir ${dogName}?`)) {
    return;
  }

  try {
    showStatus("Excluindo...", "loading");

    const response = await fetch(`${API_BASE_URL}/dogs/${dogName}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir");
    }

    showStatus("Cachorro excluído com sucesso!", "success");
    loadDogs();
    loadTopDogs();
  } catch (error) {
    console.error("Erro:", error);
    showStatus(`Erro ao excluir: ${error.message}`, "error");
  }
}

// Votar em um cachorro
async function voteForDog(dogId) {
  try {
    const response = await fetch(`${API_BASE_URL}/dogs/vote/${dogId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao votar");
    }

    loadDogs();
    loadTopDogs();
  } catch (error) {
    console.error("Erro:", error);
    showStatus(`Erro ao votar: ${error.message}`, "error");
  }
}

// Mostrar mensagem de status
function showStatus(message, type) {
  formStatus.innerHTML = `<div class="status-message ${type}">${message}</div>`;
  if (type !== "loading") {
    setTimeout(() => (formStatus.innerHTML = ""), 3000);
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  loadDogs();
  loadTopDogs();
});
