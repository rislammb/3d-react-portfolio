import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink
        className={
          'w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md'
        }
        to={'/'}
      >
        <p className='blue-gradient_text'>RI</p>
      </NavLink>
      <nav className='flex gap-3'>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-blue-500' : 'text-black'
          }
          to={'/projects'}
        >
          Projects
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-blue-500' : 'text-black'
          }
          to={'/contact'}
        >
          Contact
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-blue-500' : 'text-black'
          }
          to={'/about'}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
