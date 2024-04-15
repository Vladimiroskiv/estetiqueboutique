document.addEventListener('DOMContentLoaded', function () {
    const serviciiSelect = document.getElementById('servicii');
    const pretServiciuInput = document.getElementById('pret_serviciu');

    serviciiSelect.addEventListener('change', function () {
        const pret = this.options[this.selectedIndex].dataset.price || '0';
        pretServiciuInput.value = pret + ' RON';
    });
    
    if (serviciiSelect.selectedIndex > -1) {
        const initialPrice = serviciiSelect.options[serviciiSelect.selectedIndex].dataset.price || '0';
        pretServiciuInput.value = initialPrice + ' RON';
    }
});
