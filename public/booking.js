
const submitButton = document.querySelector('.submit-detail-fillup');


const selectDateButtons = document.querySelectorAll('.the-date');
classChecker = (classes) => {
    classes.forEach(el => {
        if (el.classList.contains('active')) {
            return el.classList.remove('active');
        }
    });
}

// for selcting individual date
selectDateButtons.forEach(el => {
    el.addEventListener('click', e => {
        classChecker(selectDateButtons);
        el.classList.toggle('active');
    });
});

submitButton.addEventListener('click', async el => {
    const selectedDate = document.querySelector('.the-Dates .active').innerText.toLowerCase();
    const country = document.querySelector('#input-country').value.toLowerCase();
    const contact = document.querySelector('#phone-number').value;
    const paymentPIN = document.querySelector('#input-payment-pin').value;
    const paymentCVV = document.querySelector('#input-payment-cvv').value;

    const slug = window.location.pathname.split('/')[1];

    // sending the data to the backend
    const destination = await axios({
        method: 'POST',
        url: './../api/v1/destination/create',
        data: {
            selectedDate,
            country,
            contact,
            paymentPIN,
            paymentCVV,
            slug
        }
    });

    if (destination.data.status === 'success') {
        window.location.reload();
    } else {
        alert(sendData.data.message)
    }
})