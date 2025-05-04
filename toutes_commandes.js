document.addEventListener("DOMContentLoaded", () => {
    const commandes = JSON.parse(localStorage.getItem("commandes")) || [];
    const tbody = document.getElementById("toutes-commandes-body");
  
    commandes.forEach(cmd => {
      const tr = document.createElement("tr");
  
      const tdClient = document.createElement("td");
      tdClient.textContent = cmd.client;
  
      const tdArticle = document.createElement("td");
      tdArticle.textContent = cmd.article;
  
      const tdQuantite = document.createElement("td");
      tdQuantite.textContent = cmd.quantite;
  
      const tdDate = document.createElement("td");
      tdDate.textContent = cmd.date;
  
      tr.appendChild(tdClient);
      tr.appendChild(tdArticle);
      tr.appendChild(tdQuantite);
      tr.appendChild(tdDate);
      tbody.appendChild(tr);
    });
  });
  