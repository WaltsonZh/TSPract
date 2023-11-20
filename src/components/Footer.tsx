import '../assets/Footer.css'

export default function Footer() {
  return (
    <div className='Footer'>
      <p>TypeScript Practice Todo List</p>
      <div className='Footer-links'>
        <a href='https://github.com/WaltsonZh' target='_blank'>
          <i className='bx bxl-github'></i>
        </a>
        <a href='https://www.linkedin.com/in/waltsonzh' target='_blank'>
          <i className='bx bxl-linkedin'></i>
        </a>
        <a href='mailto:waltson2003@gmail.com'>
          <i className='bx bx-envelope'></i>
        </a>
      </div>
    </div>
  )
}
