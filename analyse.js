document.addEventListener("DOMContentLoaded", () => {
    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    const fournisseurs = JSON.parse(localStorage.getItem("fournisseurs")) || [];
    const articles = JSON.parse(localStorage.getItem("articles")) || [];
    const commandes = JSON.parse(localStorage.getItem("commandes")) || [];
  
    document.getElementById("client-count").textContent = clients.length;
    document.getElementById("fournisseur-count").textContent = fournisseurs.length;
    document.getElementById("article-count").textContent = articles.length;
    document.getElementById("commande-count").textContent = commandes.length;
  });
  document.addEventListener("DOMContentLoaded", () => {
    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    const fournisseurs = JSON.parse(localStorage.getItem("fournisseurs")) || [];
    const articles = JSON.parse(localStorage.getItem("articles")) || [];
    const commandes = JSON.parse(localStorage.getItem("commandes")) || [];
  
    document.getElementById("client-count").textContent = clients.length;
    document.getElementById("fournisseur-count").textContent = fournisseurs.length;
    document.getElementById("article-count").textContent = articles.length;
    document.getElementById("commande-count").textContent = commandes.length;
  
    // Regrouper les commandes par date
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
  