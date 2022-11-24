import React, {useCallback, useEffect, useState} from 'react';
import {Countries, InfoCounter} from "../../types";
import axios from "axios";
import {Box, ListItem, ListItemButton, ListItemText} from "@mui/material";
import InfoCountries from "../InfoCountris/InfoCountries";

const URL = 'https://restcountries.com/v2/all?fields=alpha3Code,name';
const URL_CODE = 'https://restcountries.com/v2/alpha/';

const App = () => {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [infoCountries, setInfoCountries] = useState<InfoCounter | null>(null);
  const [code, setCode] = useState('');

  const countriesResponse = useCallback( async () => {
    const res = await axios.get(URL);
    setCountries(res.data);
  }, [])

  const responseInfo = useCallback(async () => {
    const res = await axios.get(URL_CODE + code);
    setInfoCountries(res.data);
  }, [code])

  useEffect(() => {
    countriesResponse().catch(console.error);
  }, [countriesResponse])

  useEffect(() => {
    if (code !== '') {
      responseInfo().catch(console.error);
    }
  }, [code, responseInfo])


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          width: '300px',
          flexShrink: 0,
          height: '100vh',
          overflowY: 'scroll'
        }}
      >
        {
          countries.map(item => (
            <ListItem key={item.alpha3Code} component="div" disablePadding>
              <ListItemButton onClick={() => setCode(item.alpha3Code)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))
        }
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: '#ddd',
        }}
      >
        <InfoCountries infoCounter={infoCountries}/>
      </Box>
    </Box>
  );
};

export default App;