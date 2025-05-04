const form = document.getElementById("article-form");
const list = document.getElementById("article-list");

let articles = JSON.parse(localStorage.getItem("articles")) || [];
let editIndex = -1; // Index de l'article à modifier

function renderArticles() {
  list.innerHTML = "";
  articles.forEach((article, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${article.nom}</td>
      <td>${article.quantite}</td>
      <td>${article.prix} FCFA</td>
      <td>
        <button class="edit-btn" onclick="editArticle(${index})">Modifier</button>
        <button class="delete-btn" onclick="deleteArticle(${index})">Supprimer</button>
      </td>
    `;
    list.appendChild(row);
  });
}

function deleteArticle(index) {
  if (confirm("Supprimer cet article ?")) {
    articles.splice(index, 1);
    localStorage.setItem("articles", JSON.stringify(articles));
    renderArticles();
  }
}

function editArticle(index) {
  const article = articles[index];
  document.getElementById("article-name").value = article.nom;
  document.getElementById("article-qty").value = article.quantite;
  document.getElementById("article-price").value = article.prix;
  editIndex = index;
  form.querySelector("button[type='submit']").textContent = "Mettre à jour";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nom = document.getElementById("article-name").value.trim();
  const quantite = parseInt(document.getElementById("article-qty").value);
  const prix = parseFloat(document.getElementById("article-price").value);

  if (editIndex === -1) {
    // Ajout
    articles.push({ nom, quantite, prix });
  } else {
    // Modification
    articles[editIndex] = { nom, quantite, prix };
    editIndex = -1;
    form.querySelector("button[type='submit']").textContent = "Ajouter";
  }

  localStorage.setItem("articles", JSON.stringify(articles));
  form.reset();
  renderArticles();
});

renderArticles();
