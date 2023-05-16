import React from 'react'
import { Grid, Typography, Fade, Card, CardContent } from '@mui/material'
import { styled } from '@mui/system'

const WeatherInfoItem = styled(Card)(({ theme, color }) => ({
  textAlign: 'center',
  backgroundColor: color,
  height: '100%',
}))

const HighlightedTypography = styled(Typography)(({ color }) => ({
  color,
}))

function WeatherInfo({ city, country, temperature, windspeed }) {
  return (
    <Fade in={true}>
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} sm={6} md={3}>
          <WeatherInfoItem color="primary.main">
            <CardContent>
              <Typography variant="h6">City</Typography>
              <HighlightedTypography
                variant="body1"
                color="secondary"
                fontWeight="bold"
              >
                {city}
              </HighlightedTypography>
            </CardContent>
          </WeatherInfoItem>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <WeatherInfoItem color="secondary.main">
            <CardContent>
              <Typography variant="h6">Country</Typography>
              <HighlightedTypography
                variant="body1"
                color="secondary"
                fontWeight="bold"
              >
                {country}
              </HighlightedTypography>
            </CardContent>
          </WeatherInfoItem>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <WeatherInfoItem color="info.main">
            <CardContent>
              <Typography variant="h6">Temperature</Typography>
              <HighlightedTypography
                variant="body1"
                color="secondary"
                fontWeight="bold"
              >
                {temperature}°C
              </HighlightedTypography>
            </CardContent>
          </WeatherInfoItem>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <WeatherInfoItem color="warning.main">
            <CardContent>
              <Typography variant="h6">Wind Speed</Typography>
              <HighlightedTypography
                variant="body1"
                color="secondary"
                fontWeight="bold"
              >
                {windspeed} km/h
              </HighlightedTypography>
            </CardContent>
          </WeatherInfoItem>
        </Grid>
      </Grid>
    </Fade>
  )
}

export default WeatherInfo
