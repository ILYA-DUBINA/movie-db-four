import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './headerRouter.css';

const HeaderRouter = () => {
  const [border, setTextBorder] = useState('2px solid #1890ff');
  const [borderTwo, setTextBorderTwo] = useState('2px solid transparent');
  const [textColor, setTextColor] = useState('#1890ff');
  const [textColorTwo, setTextColorTwo] = useState('rgba(0, 0, 0, 0.65)');

  const changeStyle = () => {
    setTextColor('#1890ff');
    setTextColorTwo('rgba(0, 0, 0, 0.65)');
    setTextBorder('2px solid #1890ff');
    setTextBorderTwo('2px solid transparent');
  };
  const changeStyleTwo = () => {
    setTextColor('rgba(0, 0, 0, 0.65)');
    setTextColorTwo('#1890ff');
    setTextBorder('2px solid transparent');
    setTextBorderTwo('2px solid #1890ff');
  };

  return (
    <>
      <header>
        <div className="header__search" style={{ borderBottom: border }}>
          <Link style={{ color: textColor }} to="/" onClick={changeStyle}>
            Search
          </Link>
        </div>
        <div className="header__reted" style={{ borderBottom: borderTwo }}>
          <Link style={{ color: textColorTwo }} to="/reted" onClick={changeStyleTwo}>
            Reted
          </Link>
        </div>
      </header>
    </>
  );
};

export default HeaderRouter;
