'use client';

import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
  const [logs, setLogs] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const endpoint = 'https://v2.jokeapi.dev/joke/Dark,Pun?type=twopart';
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const result = await response.json();

        if (result.setup && result.delivery) {
          // Display the setup
          setLogs((prevLogs) => [
            ...prevLogs,
            `𝕕𝕒𝕣𝕜 𝕛𝕠𝕜𝕖𝕣> ${result.setup}`,
          ]);

          // Delay for delivery
          setTimeout(() => {
            setLogs((prevLogs) => [
              ...prevLogs,
              `${result.delivery}`,
            ]);
          }, 3000);
        } else {
          // Log if setup/delivery missing
          setLogs((prevLogs) => [
            ...prevLogs,
            `Response at ${new Date().toLocaleTimeString()}: ${JSON.stringify(result)}`,
          ]);
        }
      } catch (error) {
        setLogs((prevLogs) => [
          ...prevLogs,
          `Error at ${new Date().toLocaleTimeString()}: ${error.message}`,
        ]);
      }
    };

    if (isFetching) {
      fetchData();
      intervalRef.current = setInterval(fetchData, 10000);
    }

    return () => clearInterval(intervalRef.current);
  }, [endpoint, isFetching]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        height: '100vh',
        width: '100%',
      }}
    >
      <div
        style={{
          backgroundColor: '#000',
          color: '#fff',
          fontFamily: 'monospace',
          padding: '20px',
          borderRadius: '12px',
          width: '80%',
          maxWidth: '600px',
          height: '80%',
          overflowY: 'auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h1 style={{ fontSize: '24px', marginBottom: '16px', textAlign: 'center' }}>
          𝕕𝕒𝕣𝕜 𝕥𝕖𝕣𝕞𝕚𝕟𝕒𝕝
        </h1>
        <div>
          {logs.map((log, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              {log}
            </div>
          ))}
        </div>
        <button
          onClick={() => setIsFetching(!isFetching)}
          style={{
            marginTop: '10px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {isFetching ? 'Pause' : 'Resume'}
        </button>
      </div>
    </div>
  );
};

export default Terminal;
