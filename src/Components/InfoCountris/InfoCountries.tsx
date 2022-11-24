import React from 'react';
import {InfoCounter} from "../../types";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Box, Alert, Typography,
} from "@mui/material";
import CountriesBorder from "./CountriesBorder";

interface Props {
  infoCounter: InfoCounter | null;
}

const InfoCountries:React.FC<Props> = ({infoCounter}) => {
  return infoCounter ? (
    <Box sx={{display: 'flex', justifyContent: 'center', pt: 5}}>

      <Card sx={{ width: 900, height: 750, overflowY: 'scroll'}}>
        <CardHeader
          avatar={<Avatar aria-label="recipe">{infoCounter.alpha3Code}</Avatar>}
          title={infoCounter.name}
          subheader={infoCounter.timezones[0]}
        />
        <CardMedia
          component="img"
          height="500"
          image={infoCounter.flag}
          alt="flag"
        />
        <CardContent>
          <Typography variant='h4' component='h3'>Граничит с </Typography>
          <CountriesBorder counterBorder={infoCounter.borders}/>
          <Typography variant='h4' component='p'>Популяция: {infoCounter.population}</Typography>
          <Typography variant='h4' component='p'>Город: {infoCounter.capital}</Typography>
        </CardContent>
      </Card>

    </Box>
  ) : <Alert severity="info">Нужно выбрать страну !</Alert>
};

export default InfoCountries;