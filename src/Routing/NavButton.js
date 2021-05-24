import React from 'react'

export function NavButton() {
  const styles = {
    position: "fixed",
    top: 0,
    left: 0,
    padding: '.25rem .5rem',
    margin: '.75rem 1rem',

  }
  function openNav(e){
    e.stopPropagation();
    document.getElementById('root').classList.replace('closed','open');
  }

  return (
    <button style={styles} onClick={openNav}>☰</button>
  )
}

export default NavButton
