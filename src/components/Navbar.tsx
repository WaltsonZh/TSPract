import { NavLink } from 'react-router-dom'
import '../assets/Navbar.css'
import { useRef } from 'react'

export default function Navbar() {
  const menu = useRef<HTMLDivElement | null>(null)
  const overlay = useRef<HTMLDivElement | null>(null)

  const toggleMenu = () => {
    const display = menu.current?.style.display
    if (display === 'none' && menu.current && overlay.current) {
      menu.current.style.display = 'grid'
      overlay.current.style.display = 'block'
      overlay.current.style.display
    } else if (menu.current && overlay.current) {
      menu.current.style.display = 'none'
      overlay.current.style.display = 'none'
    }
  }

  return (
    <nav className='Navbar'>
      <div className='Navbar-logo'>
        <i className='bx bxl-typescript'></i>
      </div>
      <i className='bx bx-menu' onClick={toggleMenu}></i>
      <div className='Navbar-overlay' onClick={toggleMenu} ref={overlay}></div>
      <div className='Navbar-list' ref={menu} onClick={toggleMenu}>
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
