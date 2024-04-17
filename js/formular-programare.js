document.addEventListener('DOMContentLoaded', function () {
    const serviciiSelect = document.getElementById('servicii');
    const totalPlataInput = document.getElementById('total_plata');
    const formularProgramare = document.getElementById('formular-programare');
    const modal = document.getElementById('modal-success');
    const closeModal = document.getElementsByClassName('close-btn')[0];
    const inputData = document.getElementById('data');
    const inputOra = document.getElementById('ora');
    const eroareData = document.getElementById('eroare-data');
    const eroareOra = document.getElementById('eroare-ora');
  
    // Actualizează minimul pentru inputul de tip 'date' cu data curentă
    const dataCurenta = new Date();
    inputData.min = dataCurenta.toISOString().split('T')[0];
    
    // Funcție pentru a actualiza ora minimă în funcție de data selectată
    function actualizeazaOraMinima() {
        const dataSelectata = new Date(inputData.value);
        const acum = new Date();
        // Dacă data selectată este aceeași cu data curentă, setează ora minimă
        if (dataSelectata.toDateString() === acum.toDateString()) {
          // Folosește ora curentă dacă este mai târziu decât ora de deschidere
          let oraMinima = '09:00'; // Presupunem că ora de deschidere este 09:00
          let oraCurenta = acum.getHours().toString().padStart(2, '0') + ':' + acum.getMinutes().toString().padStart(2, '0');
          if (oraCurenta > oraMinima) {
            inputOra.min = oraCurenta;
          } else {
            inputOra.min = oraMinima;
          }
        } else {
          // Dacă este o dată viitoare, permite orice oră între orele de deschidere și închidere
          inputOra.min = '09:00';
        }
    }
      
  
    // Adaugă listener pentru schimbarea datei
    inputData.addEventListener('change', function () {
      eroareData.textContent = ''; // Resetează mesajul de eroare
      actualizeazaOraMinima(); // Actualizează ora minimă
    });
  
    // Adaugă listener pentru schimbarea orei
    inputOra.addEventListener('change', function () {
      eroareOra.textContent = ''; // Resetează mesajul de eroare
    });
  
    inputOra.max = '18:00'; // Setează ora maximă
  
    // Calculul totalului de plată la schimbarea selecției de servicii
    serviciiSelect.addEventListener('change', function () {
      let total = 0;
      Array.from(this.selectedOptions).forEach(function (option) {
        total += parseFloat(option.value);
      });
      totalPlataInput.value = total.toFixed(2) + ' RON';
    });
  
    // Logica de submit pentru formular
    formularProgramare.addEventListener('submit', function (event) {
      event.preventDefault();
      eroareData.textContent = '';
      eroareOra.textContent = '';
  
      const dataSelectata = new Date(inputData.value);
      const oraSelectata = inputOra.value;
      const acum = new Date();
  
      if (dataSelectata.setHours(0, 0, 0, 0) < acum.setHours(0, 0, 0, 0)) {
        eroareData.textContent = 'Nu poți selecta o dată în trecut!';
        return;
      } else if (dataSelectata.toDateString() === acum.toDateString() && oraSelectata < acum.toTimeString().substring(0, 5)) {
        eroareOra.textContent = 'Nu poți selecta o oră în trecut!';
        return;
      }
  
      if (formularProgramare.checkValidity()) {
        modal.style.display = 'block';
        setTimeout(function () {
          modal.style.display = 'none';
          window.location.href = '../index.html';
        }, 3000);
      } else {
        formularProgramare.reportValidity();
      }
    });
  
    // Închiderea modalului
    closeModal.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  
    // Închiderea modalului dacă se face click în afara lui
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  });
  