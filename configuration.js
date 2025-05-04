document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-configuration");
    const nomMagasinInput = document.getElementById("nom-magasin");
    const monnaieInput = document.getElementById("monnaie");
    const taxeInput = document.getElementById("taxe");
  
    // Charger les paramètres de configuration depuis localStorage
    const config = JSON.parse(localStorage.getItem("config")) || {
      nomMagasin: "",
      monnaie: "",
      taxe: 0
    };
  
    // Remplir les champs avec les données sauvegardées
    nomMagasinInput.value = config.nomMagasin;
    monnaieInput.value = config.monnaie;
    taxeInput.value = config.taxe;
  
    // Sauvegarder la configuration lors de la soumission du formulaire
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const nomMagasin = nomMagasinInput.value;
      const monnaie = monnaieInput.value;
      const taxe = parseFloat(taxeInput.value);
  
      // Validation simple
      if (!nomMagasin || !monnaie || isNaN(taxe)) {
        alert("Veuillez remplir tous les champs correctement.");
        return;
      }
  
      // Sauvegarder la configuration dans localStorage
      const newConfig = { nomMagasin, monnaie, taxe };
      localStorage.setItem("config", JSON.stringify(newConfig));
  
      alert("Paramètres sauvegardés !");
    });
  });
  