import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Typography,
  ThemeProvider,
  createTheme,
  CircularProgress,
  styled,
  Snackbar,
} from '@mui/material'
import WeatherInfo from './WeatherInfo'

const ContainerLoading = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}))

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
  const [geolocationError, setGeolocationError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/weather`,
          {
            params: {
              latitude,
              longitude,
            },
          },
        )
        setWeatherData(response.data)
      } catch (error) {
        setErrorSnackbarOpen(true)
      }
    }

    if (latitude && longitude) {
      fetchData()
    }
  }, [latitude, longitude])

  useEffect(() => {
    const getGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
          },
          () => {
            setGeolocationError(true)
            setErrorSnackbarOpen(true)
          },
        )
      } else {
        setGeolocationError(true)
        setErrorSnackbarOpen(true)
      }
    }

    getGeolocation()
  }, [])

  const handleCloseSnackbar = () => {
    setErrorSnackbarOpen(false)
  }

  if (geolocationError) {
    return (
      <ContainerLoading>
        <Typography variant="h6" align="center" gutterBottom>
          Permita a localização para acessar as informações climáticas.
        </Typography>
      </ContainerLoading>
    )
  }

  if (!weatherData) {
    return (
      <ContainerLoading>
        <CircularProgress />
      </ContainerLoading>
    )
  }

  const { city, country, temperature, windspeed } = weatherData

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
      info: {
        main: '#4caf50',
      },
      warning: {
        main: '#ff9800',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography variant="h4" align="center" gutterBottom>
          Weather Information
        </Typography>
        <WeatherInfo
          city={city}
          country={country}
          temperature={temperature}
          windspeed={windspeed}
        />
        <Snackbar
          open={errorSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Error fetching weather data"
        />
      </div>
    </ThemeProvider>
  )
}

export default App
