// vente.js

// Données simulées pour clients et articles
const clients = [
  { id: 1, nom: "Ange Lawali" },
  { id: 2, nom: "Aimé" },
];

const articles = [
  { id: 1, nom: "Café", prix: 100 },
  { id: 2, nom: "Coca", prix: 600 },
  { id: 3, nom: "Riz gras", prix: 1000 },
];

const selectedArticles = [];
let ventes = [];

// Initialisation au chargement
window.addEventListener("DOMContentLoaded", () => {
  chargerClients();
  chargerArticles();
  document.getElementById("add-article-btn").addEventListener("click", ajouterArticle);
  document.getElementById("vente-form").addEventListener("submit", finaliserVente);
});

function chargerClients() {
  const select = document.getElementById("client");
  clients.forEach(client => {
    const option = document.createElement("option");
    option.value = client.id;
    option.textContent = client.nom;
    select.appendChild(option);
  });
}

function chargerArticles() {
  const select = document.getElementById("articles");
  articles.forEach(article => {
    const option = document.createElement("option");
    option.value = article.id;
    option.textContent = `${article.nom} - ${article.prix} FCFA`;
    select.appendChild(option);
  });
}

function ajouterArticle() {
  const articleId = parseInt(document.getElementById("articles").value);
  const quantite = parseInt(document.getElementById("quantite").value);
  const article = articles.find(a => a.id === articleId);

  if (!article || isNaN(quantite) || quantite <= 0) {
    showMessage("Sélectionnez un article et une quantité valide.", "error");
    return;
  }

  selectedArticles.push({ ...article, quantite });
  showMessage(`Article ajouté : ${article.nom} x${quantite}`);
  calculerTotal();
}

function calculerTotal() {
  const total = selectedArticles.reduce((acc, item) => acc + item.prix * item.quantite, 0);
  document.getElementById("total-vente").textContent = total.toFixed(2);
}

function finaliserVente(e) {
  e.preventDefault();
  const clientId = parseInt(document.getElementById("client").value);
  const client = clients.find(c => c.id === clientId);
  const total = selectedArticles.reduce((acc, item) => acc + item.prix * item.quantite, 0);

  if (!client || selectedArticles.length === 0) {
    showMessage("Veuillez sélectionner un client et au moins un article.", "error");
    return;
  }

  const vente = {
    id: ventes.length + 1,
    client: client.nom,
    date: new Date().toLocaleDateString(),
    total: total.toFixed(2),
  };

  ventes.push(vente);
  afficherVentes();
  showMessage("Vente enregistrée !", "success");

  // Réinitialisation
  selectedArticles.length = 0;
  document.getElementById("vente-form").reset();
  document.getElementById("total-vente").textContent = "0";
}

function afficherVentes() {
  const tbody = document.querySelector("#historique-table tbody");
  tbody.innerHTML = "";
  ventes.forEach(v => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${v.id}</td>
      <td>${v.client}</td>
      <td>${v.date}</td>
      <td>${v.total} FCFA</td>
    `;
    tbody.appendChild(tr);
  });
}

function showMessage(message, type = "success") {
  const box = document.getElementById("message-box");
  box.textContent = message;
  box.className = `message ${type}`;
  box.style.display = "block";
  setTimeout(() => (box.style.display = "none"), 3000);
}
