import React from 'react';
import './NavBar.css';

const NavBar = (props: any) => {
  return (
    <div className="navbar-wrapper">
      <h2 className="navbar-title">React Kanban</h2>
      <div className="navbar-interface">
        <input
          className="navbar-input"
          type="text"
          value={props.text}
          onChange={(e) => {
            props.setText(e.target.value);
          }}
        />
        <button className="navbar-button" onClick={props.addItem}>
          + Add
        </button>
      </div>
    </div>
  );
};

export default NavBar;
