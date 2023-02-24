import fetch from 'isomorphic-unfetch';

export default async function handler(req, res) {
  const { city } = req.query;
  const apiKey = process.env.API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    res.status(response.status).json({ message: error.message });
    return;
  }

  const data = await response.json();

  res.status(200).json(data);
}

