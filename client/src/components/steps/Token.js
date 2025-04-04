import { Button } from '@mui/material';
import './Token.scss';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


function Token({ next }) {

  const [token, setToken] = useState();
  const [businessId, setBusinessId] = useState();
  const [numberId, setNumberId] = useState();

  return (
    <div className="tm-steps-token  tm-card-step tm-shadow">
      <div className="tm-step-header">
        <img src='https://i.postimg.cc/pLjCMkfQ/Group-3-1.png' border='0' alt='Group-3-1' />
        <span className="tm-h3">Datos de la cuenta</span>
      </div>
      <div className="tm-step-double-input">
        <div className="tm-step-input">
          <p className='app-section-title tm-h4'>
            Identificador de la cuenta de WhatsApp Business
          </p>
          <TextField
            variant="outlined"
            fullWidth
            value={businessId}
            placeholder='179327168590277'
            onChange={(e) => setBusinessId(e.target.value)}
          />
        </div>
        <div className="tm-step-input">
          <p className='app-section-title tm-h4'>
            Identificador de número de teléfono
          </p>
          <TextField
            variant="outlined"
            fullWidth
            value={numberId}
            placeholder='183207244872691'
            onChange={(e) => setNumberId(e.target.value)}
          />
        </div>
      </div>
      <p className='app-section-title tm-h4'>
        Ingresa el token de meta
      </p>
      <TextField
        variant="outlined"
        fullWidth
        value={token}
        placeholder='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
        onChange={(e) => setToken(e.target.value)}
      />
      <Button className='app-buton' variant="contained" onClick={() => next(businessId, numberId, token)}>Siguiente</Button>
    </div>
  );
}

export default Token;
