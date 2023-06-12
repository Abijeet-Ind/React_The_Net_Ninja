if (window.location.pathname === '/') {
    const padding = document.querySelector('body');
    padding.classList.remove('padding');
    console.log(padding);

    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        margin: 1,
        autoplayTimeout: 2500,
        autoplayHoverPause: true
    })
}

if (document.children[0].ownerDocument.all[15].id === 'map') {
    mapboxgl.accessToken = 'pk.eyJ1IjoibW9uamlybyIsImEiOiJjbDF3b2FidncxczFiM2RvZmhiaDMyc3FvIn0.1xj07WwNRMHd6FHTSK534A';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/monjiro/cl2gb9j1r001t14n2k4iyka2i', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 15,
    });
    map.scrollZoom.disable();

}

if (window.location.pathname === '/login') {
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', async (el) => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;


        const sendData = await axios({
            method: 'POST',
            url: '/api/v1/user/login',
            data: {
                email,
                password
            }
        })

        if (sendData.data.status === 'success') {
            window.location.assign(window.location.origin);
        } else {
            alert(sendData.data.message)
        }
    })
}

if (window.location.pathname === '/signup') {
    const submit = document.getElementById('submit-button');

    submit.addEventListener('click', async (el) => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;

        const registerData = await axios({
            method: 'POST',
            url: "/api/v1/user/signup",
            data: {
                name,
                email,
                password,
                passwordConfirm
            }

        })

        // console.log(registerData)
        if (sendData.data.status === 'success') {
            window.location.assign(window.location.origin);
        } else {
            alert(sendData.data.message)
        }
    })
}

