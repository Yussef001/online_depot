document.addEventListener("DOMContentLoaded", () => {
    const articles = JSON.parse(localStorage.getItem("articles")) || [];
    const tbody = document.getElementById("stock-table-body");
  
    articles.forEach(article => {
      const tr = document.createElement("tr");
  
      const tdNom = document.createElement("td");
      tdNom.textContent = article.nom;
  
      const tdRef = document.createElement("td");
      tdRef.textContent = article.reference;
  
      const tdStock = document.createElement("td");
      tdStock.textContent = article.quantite;
      if (article.seuil && article.quantite < article.seuil) {
        tdStock.style.color = "red";
        tdStock.style.fontWeight = "bold";
      }
  
      const tdSeuil = document.createElement("td");
      tdSeuil.textContent = article.seuil ?? "-";
  
      tr.appendChild(tdNom);
      tr.appendChild(tdRef);
      tr.appendChild(tdStock);
      tr.appendChild(tdSeuil);
      tbody.appendChild(tr);
    });
  });
  