import { NavLink } from 'react-router-dom'
import '../assets/Navbar.css'
import { useState } from 'react'

export default function Navbar() {
  const [checked, setChecked] = useState<boolean>(false)

  const toggleChecked = () => {
    setChecked((prevChecked) => !prevChecked)
  }

  return (
    <nav className='Navbar'>
      <div className='Navbar-logo'>
        <i className='bx bxl-typescript'></i>
      </div>
      <input
        type='checkbox'
        id='Navbar-toggle'
        style={{ display: 'none' }}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked)
        }}
      />
      <i className='bx bx-menu' onClick={toggleChecked}></i>
      <div className='Navbar-overlay' onClick={toggleChecked}></div>
      <div className='Navbar-list' onClick={toggleChecked}>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'Navbar-current' : '')}>
          Todo
        </NavLink>
        <NavLink to='/done' className={({ isActive }) => (isActive ? 'Navbar-current' : '')}>
          Done
        </NavLink>
        <NavLink to='/add' className={({ isActive }) => (isActive ? 'Navbar-current' : '')}>
          Add
        </NavLink>
      </div>
    </nav>
  )
}
