import { Button } from '@mui/material';
import './Message.scss';
import TextField from '@mui/material/TextField';


function Message({ sendMessage, message, setMessage, back }) {

  return (
    <div className="tm-steps-message visible tm-card-step tm-shadow">
      <div className="tm-step-header">
        <img src='https://i.postimg.cc/zfCprXyM/Group-4.png' border='0' alt='Group-3-1' />
        <span className="tm-h3">Mensaje</span>
      </div>
      <p className='app-section-title tm-h4'>Ingresa el mensaje que deseas enviar a todos tus contactos.</p>
      <TextField
        multiline
        rows={3}
        variant="outlined"
        fullWidth
        value={message}
        placeholder='Hola, ¿cómo estás?'
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="tm-section-buttons">
        <Button className='app-buton-secundary' variant="outlined" onClick={back}>Atras</Button>
        <Button className='app-buton' variant="contained" onClick={() => sendMessage()}>Enviar</Button>
      </div>
    </div>
  );
}

export default Message;