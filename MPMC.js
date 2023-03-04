import React, { useState, useEffect } from 'react';

function MPMC() {
  const [subscribers, setSubscribers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    subscribers.forEach((subscriber) => {
      subscriber.callback(message.message);
    });
  }, [message]);

  function subscribe(subscriber) {
    console.log('MPMC subscription');
    setSubscribers([...subscribers, subscriber]);
  }

  function unsubscribe(subscriber) {
    console.log('MPMC unsubscription');
    setSubscribers(subscribers.filter((s) => s.subscriber !== subscriber));
  }

  function send(message) {
    setMessage({ message, random : Math.random() });
  }

  return { subscribe, unsubscribe, send };
}

export default MPMC;