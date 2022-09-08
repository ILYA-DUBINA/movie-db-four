import React from 'react';
import './error-indicator.css';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <div>Упс!</div>
      <div>Что-то пошло не так</div>
      <div>Ждем или перезагружаемся!</div>
    </div>
  );
};

export default ErrorIndicator;
