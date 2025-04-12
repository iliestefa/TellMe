import './Steps.scss';
import Contacts from './Contacts';
import Message from './Message';
import { useState } from 'react';
import { useApp } from '../ContextApp';


function Steps() {

  const { data, setData, sendMessage } = useApp();
  const [currentStep, setCurrentStep] = useState("contacts");

  return (
    <div className="tm-steps">
      {
        currentStep === "contacts" &&
        <Contacts
          next={() => {
            setCurrentStep("message");
          }}
          contacts={data.contacts}
          setContacts={(contacts) => setData({ ...data, contacts })}
        />
      }
      {
        currentStep === "message" &&
        <Message
          sendMessage={sendMessage}
          message={data.message}
          setMessage={(message) => setData({ ...data, message })}
          back={() => setCurrentStep("contacts")}
        />}
    </div>
  );
}

export default Steps;
