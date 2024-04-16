document.addEventListener('DOMContentLoaded', function () {
    const serviciiSelect = document.getElementById('servicii');
    const pretServiciuInput = document.getElementById('pret_serviciu');
    const formularProgramare = document.getElementById('formular-programare');

    
    serviciiSelect.addEventListener('change', function () {
        const pret = this.options[this.selectedIndex].dataset.price || '0';
        pretServiciuInput.value = pret + ' RON';
    });
    
    if (serviciiSelect.selectedIndex > -1) {
        const initialPrice = serviciiSelect.options[serviciiSelect.selectedIndex].dataset.price || '0';
        pretServiciuInput.value = initialPrice + ' RON';
    }

    
    formularProgramare.addEventListener('submit', function(event) {
        event.preventDefault(); 
        

        alert('Programarea s-a realizat cu succes!');
        window.location.href = '../index.html';
    });
});
