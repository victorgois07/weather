const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors())

app.get('/weather', async (req, res) => {
  try {
    const { latitude, longitude } = req.query
    const [weatherResponse, geocodeResponse] = await Promise.all([
      axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
      ),
      axios.get(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`,
      ),
    ])

    if (weatherResponse.data && geocodeResponse.data) {
      const { temperature, windspeed } = weatherResponse.data.current_weather
      const { city, country } = geocodeResponse.data.address

      res.json({
        temperature,
        windspeed,
        city,
        country,
      })
    } else {
      throw new Error('Erro ao obter os dados do clima')
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter os dados do clima' })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

module.exports = app
