import { Button } from '@mui/material';
import './Contacts.scss';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


function Contacts({ next }) {

  const [value, setValue] = useState();

  return (
    <div className="tm-steps-contacts  tm-card-step tm-shadow">
      <div className="tm-step-header">
        <img src='https://i.postimg.cc/pLjCMkfQ/Group-3-1.png' border='0' alt='Group-3-1' />
        <span className="tm-h3">Contactos</span>
      </div>
      <p className='app-section-title tm-h4'>Ingresa hasta 30 números de whatsapp a quienes enviarás los mensajes.</p>
      <TextField
        multiline
        rows={3}
        variant="outlined"
        fullWidth
        value={value}
        placeholder='5930998776654,5930998776654,5930998776654'
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="tm-section-buttons">
        <Button className='app-buton' variant="contained" onClick={() => next(value)}>Siguiente</Button>
      </div>
    </div>
  );
}

export default Contacts;
