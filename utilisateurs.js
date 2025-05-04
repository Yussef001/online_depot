document.addEventListener("DOMContentLoaded", () => {
    const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
    const tbody = document.getElementById("utilisateurs-table-body");
  
    // Afficher la liste des utilisateurs
    function afficherUtilisateurs() {
      tbody.innerHTML = ""; // Vider la table
      utilisateurs.forEach((utilisateur, index) => {
        const tr = document.createElement("tr");
    
        const tdNom = document.createElement("td");
        tdNom.textContent = utilisateur.nom;
    
        const tdEmail = document.createElement("td");
        tdEmail.textContent = utilisateur.email;
    
        const tdRole = document.createElement("td");
        tdRole.textContent = utilisateur.role;
    
        const tdActions = document.createElement("td");
    
        // Bouton Modifier
        const btnEdit = document.createElement("button");
        btnEdit.textContent = "Modifier";
        btnEdit.classList.add("edit-btn"); // Ajout de la classe CSS
        btnEdit.addEventListener("click", () => modifierUtilisateur(index));
    
        // Bouton Supprimer
        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Supprimer";
        btnDelete.classList.add("delete-btn"); // Ajout de la classe CSS
        btnDelete.addEventListener("click", () => supprimerUtilisateur(index));
    
        tdActions.appendChild(btnEdit);
        tdActions.appendChild(btnDelete);
    
        tr.appendChild(tdNom);
        tr.appendChild(tdEmail);
        tr.appendChild(tdRole);
        tr.appendChild(tdActions);
        tbody.appendChild(tr);
      });
    }    
  
    afficherUtilisateurs();
  
    // Formulaire
    const formContainer = document.getElementById("form-container");
    const form = document.getElementById("form-utilisateur");
    const formSubmitBtn = document.getElementById("form-submit-btn");
    const formCancelBtn = document.getElementById("form-cancel-btn");
  
    let editIndex = null;
  
    // Afficher le formulaire d'ajout
    document.getElementById("btn-ajouter-utilisateur").addEventListener("click", () => {
      formContainer.style.display = "block";
      document.getElementById("form-title").textContent = "Ajouter un utilisateur";
      formSubmitBtn.textContent = "Ajouter";
      form.reset();
      editIndex = null;
    });
  
    // Annuler l'ajout/modification
    formCancelBtn.addEventListener("click", () => {
      formContainer.style.display = "none";
    });
  
    // Soumettre le formulaire
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const nom = document.getElementById("nom").value;
      const email = document.getElementById("email").value;
      const role = document.getElementById("role").value;
  
      // Validation
      if (!nom || !email || !role) {
        alert("Veuillez remplir tous les champs.");
        return;
      }
  
      if (editIndex !== null) {
        // Modifier un utilisateur
        utilisateurs[editIndex] = { nom, email, role };
      } else {
        // Ajouter un nouvel utilisateur
        utilisateurs.push({ nom, email, role });
      }
  
      localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
      formContainer.style.display = "none";
      afficherUtilisateurs();
    });
  
    // Modifier un utilisateur
    function modifierUtilisateur(index) {
      const utilisateur = utilisateurs[index];
      document.getElementById("nom").value = utilisateur.nom;
      document.getElementById("email").value = utilisateur.email;
      document.getElementById("role").value = utilisateur.role;
  
      formContainer.style.display = "block";
      document.getElementById("form-title").textContent = "Modifier un utilisateur";
      formSubmitBtn.textContent = "Mettre à jour";
      editIndex = index;
    }
  
    // Supprimer un utilisateur
    function supprimerUtilisateur(index) {
      const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
      if (confirmation) {
        utilisateurs.splice(index, 1);
        localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
        afficherUtilisateurs();
      }
    }
  });
  