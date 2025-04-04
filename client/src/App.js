import './App.scss';
import Preview from './components/Preview';
import Introduction from './components/Introduction';
import Steps from './components/steps/Steps';
import { useApp } from './components/ContextApp';
import { useEffect, useRef } from 'react';
import { io } from "socket.io-client";

function App() {
  const { data, setData } = useApp();
  const { message, userId } = data;
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) {
      console.log('No hay userId, esperando...');
      return;
    }

    if (socketRef.current?.userId === userId) {
      console.log('Ya existe una conexión para este userId');
      return;
    }

    console.log('Iniciando efecto, userId:', userId);
    setData(prev => ({ ...prev, loading: true }));

    if (socketRef.current) {
      console.log('Limpiando socket anterior');
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    console.log('Creando nueva conexión socket');
    socketRef.current = io("http://localhost:3001", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
    socketRef.current.userId = userId;

    console.log('Emitiendo startSession con userId:', userId);
    socketRef.current.emit("startSession", userId);

    socketRef.current.on("qr", (qrData) => {
      console.log("QR recibido");
      setData(prev => ({
        ...prev,
        qr: qrData,
        loading: false,
        error: null
      }));
    });

    socketRef.current.onAny((event, ...args) => {
      console.log("Evento recibido:", event, args);
    });

    socketRef.current.on("authenticated", () => {
      console.log("Autenticado");
      setData(prev => ({
        ...prev,
        loading: false,
        error: null,
        qr: "https://i.postimg.cc/s2gDnyVv/Chat-GPT-Image-4-abr-2025-12-06-51-p-m.png"
      }));
    });

    socketRef.current.on("logout", () => {
      console.log("Desconectado");
      setData(prev => ({
        ...prev,
        loading: true,
        error: null
      }));
      socketRef.current.emit("startSession", userId);
    });

    socketRef.current.on("error", (error) => {
      console.error("Error recibido:", error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    });

    socketRef.current.on("connect", () => {
      console.log("Socket conectado");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket desconectado");
    });

    return () => {
      if (socketRef.current && socketRef.current.userId !== userId) {
        console.log('Limpiando socket porque cambió el userId');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <div className="App">
      <div className="tell-me-page">
        <div className="tm-right">
          <Introduction />
          <Steps />
        </div>
        <Preview
          message={message} />
      </div>
    </div>
  );
}

export default App;