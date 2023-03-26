import React, { useState, useEffect } from 'react';

function MPMC() {
  const [subscribers, setSubscribers] = useState([]);
  const [message, setMessage] = useState("");
  const [id] = useState((Math.random() * 1e6).toFixed(0));

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

  return { id, subscribe, unsubscribe, send };
}

export default MPMC;