document.addEventListener("DOMContentLoaded", () => {
  const clients = JSON.parse(localStorage.getItem("clients")) || [];
  const fournisseurs = JSON.parse(localStorage.getItem("fournisseurs")) || [];
  const articles = JSON.parse(localStorage.getItem("articles")) || [];
  const commandes = JSON.parse(localStorage.getItem("commandes")) || [];

  // Affichage des totaux
  document.getElementById("client-count").textContent = clients.length;
  document.getElementById("fournisseur-count").textContent = fournisseurs.length;
  document.getElementById("article-count").textContent = articles.length;
  document.getElementById("commande-count").textContent = commandes.length;

  // ➤ Valeur du stock
  const valeurStock = articles.reduce((total, a) => total + (a.quantite * a.prix), 0);
  document.getElementById("valeur-stock").textContent = valeurStock.toLocaleString() + " FCFA";

  // ➤ Article le plus vendu
  const ventes = {};
  commandes.forEach(cmd => {
    (cmd.articles || []).forEach(art => {
      ventes[art.nom] = (ventes[art.nom] || 0) + art.quantite;
    });
  });

  let articleTop = "N/A";
  let maxVente = 0;
  for (let nom in ventes) {
    if (ventes[nom] > maxVente) {
      maxVente = ventes[nom];
      articleTop = nom;
    }
  }
  document.getElementById("article-top").textContent = articleTop + " (" + maxVente + ")";

  // ➤ Plus grosse vente (commande avec le montant le plus élevé)
  let maxTotal = 0;
  commandes.forEach(cmd => {
    let total = 0;
    (cmd.articles || []).forEach(art => {
      total += art.quantite * art.prix;
    });
    if (total > maxTotal) maxTotal = total;
  });
  document.getElementById("plus-grosse-vente").textContent = maxTotal.toLocaleString() + " FCFA";

  // ➤ Graphique : commandes par date
  const commandesParDate = {};
  commandes.forEach(cmd => {
    const date = cmd.date;
    commandesParDate[date] = (commandesParDate[date] || 0) + 1;
  });

  const labels = Object.keys(commandesParDate);
  const data = Object.values(commandesParDate);

  const ctx = document.getElementById("commandesChart").getContext("2d");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Commandes',
        data: data,
        backgroundColor: '#007BFF',
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Nombre de commandes par date'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          precision: 0
        }
      }
    }
  });
});
