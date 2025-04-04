import './Preview.scss';

function Preview({ message = "Hola, ¿cómo estás?" }) {
  return (
    <div className="tm-preview tm-h100 tm-shadow tm-br tm-left">
      <div className="tm-preview-message">
        <span className="tm-h5">{message}</span >
      </div>
    </div>
  );
}

export default Preview;
