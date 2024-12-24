'use client';

import React, { useState, useEffect } from 'react';

const Terminal = () => {
  const [logs, setLogs] = useState([]);
  const endpoint = 'https://v2.jokeapi.dev/joke/Dark,Pun?type=twopart'; // Replace with your actual API endpoint

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const result = await response.json();

        if (result.setup && result.delivery) {
          // Display the setup first
          setLogs((prevLogs) => [
            ...prevLogs,
            `𝕕𝕒𝕣𝕜 𝕛𝕠𝕜𝕖𝕣> ${result.setup}`,
          ]);

          // Delay for 2 seconds and then display the delivery
          setTimeout(() => {
            setLogs((prevLogs) => [
              ...prevLogs,
              `𝕕𝕒𝕣𝕜 𝕛𝕠𝕜𝕖𝕣> ${result.delivery}`,
            ]);
          }, 2000);
        } else {
          // Log the full result if setup/delivery is missing
          setLogs((prevLogs) => [
            ...prevLogs,
            `\nResponse at ${new Date().toLocaleTimeString()}: ${JSON.stringify(result)}`,
          ]);
        }
      } catch (error) {
        setLogs((prevLogs) => [
          ...prevLogs,
          `Error at ${new Date().toLocaleTimeString()}: ${error.message}`,
        ]);
      }
    };

    fetchData(); // Fetch data immediately on mount
    const interval = setInterval(fetchData, 40000); // Fetch every 40 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [endpoint]);

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
      </div>
    </div>
  );
};

export default Terminal;
