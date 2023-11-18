import { NavLink } from 'react-router-dom'
import '../assets/Navbar.css'

export default function Navbar() {
  return (
    <nav className='Navbar'>
      <div className='Navbar-logo'>
        <i className='bx bxl-typescript'></i>
      </div>
      <div className='Navbar-list'>
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
