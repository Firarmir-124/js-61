import React, {useCallback, useEffect, useState} from 'react';
import {Alert, List, ListItem, ListItemText} from "@mui/material";
import axios from "axios";
import {InfoCounter, NameCountries} from "../../types";

interface Props {
  counterBorder: string[] | [];
}

const URL_CODE = 'https://restcountries.com/v2/alpha/';

const CountriesBorder:React.FC<Props> = ({counterBorder}) => {
  const [countriesName, setCountriesName] = useState<NameCountries[]>([]);

  const borderResponse = useCallback( async () => {
    const responseNameBorder = counterBorder ?  counterBorder.map( async item => {
      const res = await axios.get<InfoCounter>(URL_CODE + item);
      return {
        id: Math.random() * 10,
        name: res.data.name
      }
    }) : [];

    const promises = await Promise.all(responseNameBorder);
    setCountriesName(promises)

  }, [counterBorder])

  useEffect(() => {
    borderResponse().catch(console.error);
  }, [borderResponse])

  return (
    <List sx={{ width: '100%', maxWidth: 360, maxHeight: 500, bgcolor: '#fff' }}>
      {
        counterBorder ? countriesName.map(item => (
          <div key={item.id}>
            <ListItem>
              <ListItemText
                primary={item.name}
              />
            </ListItem>
          </div>
        )) : <Alert severity="info">Страна не граничит</Alert>
      }
    </List>
  );
};

export default CountriesBorder;