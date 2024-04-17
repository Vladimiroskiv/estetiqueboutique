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
  
    
    const dataCurenta = new Date();
    inputData.min = dataCurenta.toISOString().split('T')[0];
    
    
    function actualizeazaOraMinima() {
        const dataSelectata = new Date(inputData.value);
        const acum = new Date();        
        if (dataSelectata.toDateString() === acum.toDateString()) {          
          let oraMinima = '09:00'; 
          let oraCurenta = acum.getHours().toString().padStart(2, '0') + ':' + acum.getMinutes().toString().padStart(2, '0');
          if (oraCurenta > oraMinima) {
            inputOra.min = oraCurenta;
          } else {
            inputOra.min = oraMinima;
          }
        } else {          
          inputOra.min = '09:00';
        }
    }
        
   
    inputData.addEventListener('change', function () {
      eroareData.textContent = ''; 
      actualizeazaOraMinima(); 
    });
  
    
    inputOra.addEventListener('change', function () {
      eroareOra.textContent = ''; 
    });
  
    inputOra.max = '18:00'; 
  
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
  
    
    closeModal.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  
    
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  });
  