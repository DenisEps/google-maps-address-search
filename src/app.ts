import Axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

// enter api key in the string below
const API_KEY = '';

type GoogleGeoCodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

function handleSearchAddress(e: Event) {
  e.preventDefault();
  const enteredAddress = addressInput.value;

  Axios.get<GoogleGeoCodingResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      enteredAddress
    )}&key=${API_KEY}`
  )
    .then((res) => {
      if (res.data.status !== 'OK') {
        throw new Error('Error fetching location');
      }
      const coords = res.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: coords,
          zoom: 10
        }
      );

      new google.maps.Marker({
        position: coords,
        map: map
      });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener('submit', handleSearchAddress);
