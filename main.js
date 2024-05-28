document.addEventListener('DOMContentLoaded', function() {
    const selectElements = document.querySelectorAll('select.form-select');

    selectElements.forEach(select => {
        select.addEventListener('change', function() {
            const selectedValue = this.value;
            const imgElement = this.parentElement.querySelector('img.img-fluid');
            updateImage(imgElement, selectedValue);
        });
    });
});

function updateImage(imgElement, selectedValue) {
    console.log(imgElement, selectedValue);
    let flagSrc;
    switch (selectedValue) {
        case 'germany':
            flagSrc = 'flags/Germany.svg';
            break;
        case 'switzerland':
            flagSrc = 'flags/Switzerland.svg';
            break;
        case 'hungary':
            flagSrc = 'flags/Hungary.svg';
            break;
        case 'scotland':
            flagSrc = 'flags/Scotland.svg';
            break;
        default:
            flagSrc = '';
    }
    imgElement.src = flagSrc;
}
