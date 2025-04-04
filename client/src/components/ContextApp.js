import React, { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
const userId = localStorage.getItem("userId") || uuidv4();
localStorage.setItem("userId", userId);

const AppContext = createContext();

export function AppProvider({ children }) {
  const [data, setData] = useState({
    message: undefined,
    token: undefined,
    contacts: undefined,
    businessId: undefined,
    userId,
    qr: undefined,
    loading: false
  });

  const sendMessage = async () => {
    const { message, contacts, userId } = data;
    console.log("Sending message: ", { message, contacts, userId });
    const url = `http://localhost:3001/ws/send-messages/${userId}`;

    const payload = {
      message,
      contacts: contacts.split(',')
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Respuesta de WhatsApp:", data);
    } catch (error) {
      console.error("Error enviando el mensaje:", error);
    }
  };

  return (
    <AppContext.Provider value={{ data, setData, sendMessage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}