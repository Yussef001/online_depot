const form = document.getElementById("fournisseur-form");
const list = document.getElementById("fournisseur-list");

let fournisseurs = JSON.parse(localStorage.getItem("fournisseurs")) || [];
let editIndex = -1;

function renderFournisseurs() {
  list.innerHTML = "";
  fournisseurs.forEach((fournisseur, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${fournisseur.nom}</td>
      <td>${fournisseur.contact}</td>
      <td>
        <button class="edit-btn" onclick="editFournisseur(${index})">Modifier</button>
        <button class="delete-btn" onclick="deleteFournisseur(${index})">Supprimer</button>
      </td>
    `;
    list.appendChild(row);
  });
}

function deleteFournisseur(index) {
  if (confirm("Supprimer ce fournisseur ?")) {
    fournisseurs.splice(index, 1);
    localStorage.setItem("fournisseurs", JSON.stringify(fournisseurs));
    renderFournisseurs();
  }
}

function editFournisseur(index) {
  const fournisseur = fournisseurs[index];
  document.getElementById("fournisseur-nom").value = fournisseur.nom;
  document.getElementById("fournisseur-contact").value = fournisseur.contact;
  editIndex = index;
  form.querySelector("button[type='submit']").textContent = "Mettre à jour";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nom = document.getElementById("fournisseur-nom").value.trim();
  const contact = document.getElementById("fournisseur-contact").value.trim();

  if (editIndex === -1) {
    fournisseurs.push({ nom, contact });
  } else {
    fournisseurs[editIndex] = { nom, contact };
    editIndex = -1;
    form.querySelector("button[type='submit']").textContent = "Ajouter";
  }

  localStorage.setItem("fournisseurs", JSON.stringify(fournisseurs));
  form.reset();
  renderFournisseurs();
});

renderFournisseurs();
