const form = document.getElementById("commande-form");
const list = document.getElementById("commande-list");

let commandes = JSON.parse(localStorage.getItem("commandes")) || [];
let editIndex = -1;

function renderCommandes() {
  list.innerHTML = "";
  commandes.forEach((commande, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${commande.ref}</td>
      <td>${commande.client}</td>
      <td>${commande.date}</td>
      <td>${commande.details}</td>
      <td>
        <button onclick="editCommande(${index})" class="edit-btn">Modifier</button>
        <button onclick="deleteCommande(${index})" class="delete-btn">Supprimer</button>
      </td>
    `;
    list.appendChild(row);
  });
}

function deleteCommande(index) {
  if (confirm("Supprimer cette commande ?")) {
    commandes.splice(index, 1);
    localStorage.setItem("commandes", JSON.stringify(commandes));
    renderCommandes();
  }
}

function editCommande(index) {
  const commande = commandes[index];
  document.getElementById("commande-ref").value = commande.ref;
  document.getElementById("commande-client").value = commande.client;
  document.getElementById("commande-date").value = commande.date;
  document.getElementById("commande-details").value = commande.details;
  editIndex = index;
  form.querySelector("button[type='submit']").textContent = "Mettre à jour";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const ref = document.getElementById("commande-ref").value.trim();
  const client = document.getElementById("commande-client").value.trim();
  const date = document.getElementById("commande-date").value;
  const details = document.getElementById("commande-details").value.trim();

  if (editIndex === -1) {
    commandes.push({ ref, client, date, details });
  } else {
    commandes[editIndex] = { ref, client, date, details };
    editIndex = -1;
    form.querySelector("button[type='submit']").textContent = "Ajouter";
  }

  localStorage.setItem("commandes", JSON.stringify(commandes));
  form.reset();
  renderCommandes();
});

renderCommandes();
