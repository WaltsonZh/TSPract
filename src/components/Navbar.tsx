import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='Navbar'>
      <div className='Navbar-logo'>
        <i className='bx bxl-typescript'></i>
      </div>
      <div className='Navbar-list'>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'current' : '')}>
          Todo
        </NavLink>
        <NavLink to='/done' className={({ isActive }) => (isActive ? 'current' : '')}>
          Done
        </NavLink>
        <NavLink to='/add' className={({ isActive }) => (isActive ? 'current' : '')}>
          Add
        </NavLink>
      </div>
    </nav>
  )
}
