let players = {}; // Objeto para armazenar os jogadores

// Recupera os jogadores do localStorage quando a página é carregada
window.onload = function () {
  const storedPlayers = localStorage.getItem("players");
  if (storedPlayers) {
    players = JSON.parse(storedPlayers);
    updatePlayerList(); // Atualiza a lista de jogadores na interface
  }
};

function showAdminLogin() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("admin-login-section").style.display = "block";
  setTimeout(() => {
    document.getElementById("admin-login-section").classList.add("show");
  }, 10);
}

function showPlayerLogin() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("player-login-section").style.display = "block";
  setTimeout(() => {
    document.getElementById("player-login-section").classList.add("show");
  }, 10);
}

function goBackToLogin() {
  document.getElementById("admin-login-section").style.display = "none";
  document.getElementById("player-login-section").style.display = "none";
  document.getElementById("login-section").style.display = "block";
}

function adminLogin() {
  const adminUsername = document.getElementById("admin-username").value;
  const adminPassword = document.getElementById("admin-password").value;

  if (adminUsername === "Elijah" && adminPassword === "Elijah321") {
    document.getElementById("admin-login-section").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
    document.getElementById("admin-login-message").textContent = "";
    setTimeout(() => {
      document.getElementById("admin-panel").classList.add("show");
    }, 10);
    updatePlayerList();
  } else {
    document.getElementById("admin-login-message").textContent =
      "Usuário ou senha incorretos!";
  }
}

function playerLogin() {
  const playerUsername = document.getElementById("player-username").value;
  const playerPassword = document.getElementById("player-password").value;

  if (
    players[playerUsername] &&
    players[playerUsername].password === playerPassword
  ) {
    document.getElementById("player-login-section").style.display = "none";
    document.getElementById("player-inventory-section").style.display = "block";
    document.getElementById("player-login-message").textContent = "";
    setTimeout(() => {
      document.getElementById("player-inventory-section").classList.add("show");
    }, 10);
    showPlayerInventory(playerUsername);
  } else {
    document.getElementById("player-login-message").textContent =
      "Usuário ou senha incorretos!";
  }
}

function registerPlayer() {
  const newPlayerUsername = document.getElementById(
    "new-player-username"
  ).value;
  const newPlayerPassword = document.getElementById(
    "new-player-password"
  ).value;

  if (newPlayerUsername && newPlayerPassword) {
    if (!players[newPlayerUsername]) {
      players[newPlayerUsername] = {
        password: newPlayerPassword,
        inventory: [],
      };
      document.getElementById("register-message").textContent =
        "Jogador registrado com sucesso!";
      document.getElementById("new-player-username").value = "";
      document.getElementById("new-player-password").value = "";
      updatePlayerList();
      savePlayersToLocalStorage(); // Salva os jogadores no localStorage
    } else {
      document.getElementById("register-message").textContent =
        "Nome de usuário já existe!";
    }
  } else {
    document.getElementById("register-message").textContent =
      "Preencha todos os campos!";
  }
}

function updatePlayerList() {
  const playersList = document.getElementById("players-list");
  playersList.innerHTML = "";

  for (const player in players) {
    const option = document.createElement("option");
    option.value = player;
    option.textContent = player;
    playersList.appendChild(option);
  }
}

function addItemToPlayer() {
  const selectedPlayer = document.getElementById("players-list").value;
  const item = document.getElementById("item").value;
  const quantity = parseInt(document.getElementById("quantity").value, 10);

  if (selectedPlayer && item && quantity) {
    players[selectedPlayer].inventory.push({ item, quantity });
    document.getElementById("add-item-message").textContent =
      "Item adicionado com sucesso!";
    document.getElementById("item").value = "";
    document.getElementById("quantity").value = "";
    showAdminPlayerInventory();
    savePlayersToLocalStorage(); // Salva os jogadores no localStorage
  } else {
    document.getElementById("add-item-message").textContent =
      "Preencha todos os campos!";
  }
}

function showAdminPlayerInventory() {
  const playerInventory = document.getElementById("admin-player-inventory");
  playerInventory.innerHTML = "";

  for (const player in players) {
    const playerLi = document.createElement("li");
    playerLi.textContent = `Jogador: ${player}`;
    const inventoryUl = document.createElement("ul");

    players[player].inventory.forEach((itemObj, index) => {
      const inventoryLi = document.createElement("li");
      inventoryLi.innerHTML = `${itemObj.item} - Quantidade: ${itemObj.quantity}`;

      const quantityControls = document.createElement("div");
      quantityControls.className = "quantity-controls";

      const increaseButton = document.createElement("button");
      increaseButton.textContent = "+";
      increaseButton.onclick = () => modifyQuantity(player, index, 1);

      const decreaseButton = document.createElement("button");
      decreaseButton.textContent = "-";
      decreaseButton.onclick = () => modifyQuantity(player, index, -1);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Excluir";
      deleteButton.className = "delete-item";
      deleteButton.onclick = () => deleteItem(player, index);

      quantityControls.appendChild(decreaseButton);
      quantityControls.appendChild(increaseButton);
      inventoryLi.appendChild(quantityControls);
      inventoryLi.appendChild(deleteButton);
      inventoryUl.appendChild(inventoryLi);
    });

    playerLi.appendChild(inventoryUl);
    playerInventory.appendChild(playerLi);
  }
}

function showPlayerInventory(playerUsername) {
  const playerInventoryList = document.getElementById("player-inventory-list");
  playerInventoryList.innerHTML = "";

  players[playerUsername].inventory.forEach((itemObj) => {
    const inventoryLi = document.createElement("li");
    inventoryLi.textContent = `${itemObj.item} - Quantidade: ${itemObj.quantity}`;
    playerInventoryList.appendChild(inventoryLi);
  });
}

function modifyQuantity(player, index, amount) {
  players[player].inventory[index].quantity += amount;
  if (players[player].inventory[index].quantity < 1) {
    players[player].inventory[index].quantity = 1;
  }
  showAdminPlayerInventory();
  savePlayersToLocalStorage(); // Salva os jogadores no localStorage
}

function deleteItem(player, index) {
  players[player].inventory.splice(index, 1);
  showAdminPlayerInventory();
  savePlayersToLocalStorage(); // Salva os jogadores no localStorage
}

function savePlayersToLocalStorage() {
  localStorage.setItem("players", JSON.stringify(players));
}

function adminLogout() {
  document.getElementById("admin-panel").style.display = "none";
  document.getElementById("login-section").style.display = "block";
}

function playerLogout() {
  document.getElementById("player-inventory-section").style.display = "none";
  document.getElementById("login-section").style.display = "block";
}
