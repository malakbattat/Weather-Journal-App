// Personal API Key for OpenWeatherMap API
const apiKey = ''; 
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getWeatherData(zip)
    .then((data) => {
      const date = new Date().toLocaleDateString();
      postData('/add', {
        temperature: data.main.temp,
        date: date,
        feel: feelings,
      });
    })
    .then(updateUI);
}

/* Function to GET Web API Data */
const getWeatherData = async (zip) => {
  const response = await fetch(`${baseUrl}${zip}&appid=${apiKey}&units=imperial`);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('temp').innerHTML = Math.round(allData.temperature) + ' degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById('date').innerHTML = allData.date;
  } catch (error) {
    console.log('error', error);
  }
};
