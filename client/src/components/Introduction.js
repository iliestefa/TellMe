import { useApp } from './ContextApp';
import './Introduction.scss';

function Introduction() {

  const {
    data: {
      qr = 'https://i.postimg.cc/jjwvB2k1/Captura-de-pantalla-2025-01-31-a-la-s-5-55-59-a-m.png',
      loading = false
    },
  } = useApp();

  return (
    <div className="tm-introduction tm-shadow">
      <div className="tm-introduction--left">
        <span className="tm-h1">
          Tell Me!
        </span>

        <p className='tm-h4'>
          Envía mensajes a distintos números de whatsapp al instante, escanea el codigo para empezar y sigue los pasos!
        </p>

      </div>
      <div className="tm-introduction--right">
        {
          loading ?
            <i className="fa-solid fa-spinner app-loading"></i>
            : <img src={qr} border='0' alt='qr' />
        }
      </div>
    </div>
  );
}

export default Introduction;
