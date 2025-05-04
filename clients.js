const form = document.getElementById("client-form");
const list = document.getElementById("client-list");

let clients = JSON.parse(localStorage.getItem("clients")) || [];
let editIndex = -1;

function renderClients() {
  list.innerHTML = "";
  clients.forEach((client, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${client.nom}</td>
      <td>${client.contact}</td>
      <td>
        <button class="edit-btn" onclick="editClient(${index})">Modifier</button>
        <button class="delete-btn" onclick="deleteClient(${index})">Supprimer</button>
      </td>
    `;
    list.appendChild(row);
  });
}

function deleteClient(index) {
  if (confirm("Supprimer ce client ?")) {
    clients.splice(index, 1);
    localStorage.setItem("clients", JSON.stringify(clients));
    renderClients();
  }
}

function editClient(index) {
  const client = clients[index];
  document.getElementById("client-nom").value = client.nom;
  document.getElementById("client-contact").value = client.contact;
  editIndex = index;
  form.querySelector("button[type='submit']").textContent = "Mettre à jour";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nom = document.getElementById("client-nom").value.trim();
  const contact = document.getElementById("client-contact").value.trim();

  if (editIndex === -1) {
    clients.push({ nom, contact });
  } else {
    clients[editIndex] = { nom, contact };
    editIndex = -1;
    form.querySelector("button[type='submit']").textContent = "Ajouter";
  }

  localStorage.setItem("clients", JSON.stringify(clients));
  form.reset();
  renderClients();
});

renderClients();
