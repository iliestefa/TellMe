import { Button } from '@mui/material';
import './Contacts.scss';
import TextField from '@mui/material/TextField';


function Contacts({ next, setContacts, contacts }) {

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^0-9,]/g, '');
    const contactList = filteredValue.split(',');
    if (contactList.length <= 30) {
      setContacts(filteredValue);
    }
  };

  const isValid = (contacts) => {
    const phoneRegex = /^[1-9]\d{1,14}$/;
    return contacts && contacts.split(',').every(contact => phoneRegex.test(contact.trim()));
  };

  return (
    <div className="tm-steps-contacts  tm-card-step tm-shadow">
      <div className="tm-step-header">
        <img src='https://i.postimg.cc/pLjCMkfQ/Group-3-1.png' border='0' alt='Group-3-1' />
        <span className="tm-h3">Contactos</span>
      </div>
      <p className='app-section-title tm-h4'>Ingresa hasta 30 números de whatsapp a quienes enviarás los mensajes.</p>
      <TextField
        multiline
        rows={5}
        variant="outlined"
        fullWidth
        value={contacts}
        placeholder='5930998776654,5930998776654,5930998776654'
        onChange={handleChange}
      />
      <div className="tm-section-buttons">
        <Button className='app-buton' variant="contained" onClick={() => next()} disabled={!isValid(contacts)}>Siguiente</Button>
      </div>
    </div>
  );
}

export default Contacts;
