import { HomeIcon, SunIcon, ViewColumnsIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function SideBar() {
  return (
    <div className='h-screen'>
      <aside className="bg-white text-dark w-72 min-h-screen drop-shadow-lg">
        <div className="mb-8 bg-primary p-4 text-center">
          <div className='h-[80px] w-[80px] mx-auto bg-white p-2'>
            <img src={logo} alt="Logo" className="h-full w-full object-contain" />
          </div>
        </div>
        <nav>
          <ul>
            <li className="my-1 mx-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "p-3 flex items-center rounded-md bg-primary bg-opacity-100 text-white"
                    : "p-3 flex items-center rounded-md hover:bg-primary bg-opacity-100"
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>

                <p className='ml-2'>Dashboard</p>
              </NavLink>
            </li>
            <li className="my-1 mx-2">
              <NavLink
                to="/categorias"
                className={({ isActive }) =>
                  isActive
                    ? "p-3 flex items-center rounded-md bg-primary bg-opacity-100 text-white"
                    : "p-3 flex items-center rounded-md hover:bg-primary bg-opacity-100"
                }
              >
                <ViewColumnsIcon className="h-5 w-5 mr-2" />
                Gestión de Categorias
              </NavLink>
            </li>
            <li className="my-1 mx-2">
              <NavLink
                to="/productos"
                className={({ isActive }) =>
                  isActive
                    ? "p-3 flex items-center rounded-md bg-primary bg-opacity-100 text-white"
                    : "p-3 flex items-center rounded-md hover:bg-primary bg-opacity-100"
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                </svg>
                <p className='ml-2'>Gestión de Productos</p>
              </NavLink>
            </li>
            <li className="my-1 mx-2">
              <NavLink
                to="/proveedores"
                className={({ isActive }) =>
                  isActive
                    ? "p-3 flex items-center rounded-md bg-primary bg-opacity-100 text-white"
                    : "p-3 flex items-center rounded-md hover:bg-primary bg-opacity-100"
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
                  <path fillRule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clipRule="evenodd" />
                </svg>
                <p className='ml-2'>Gestión de Proveedores</p>
              </NavLink>
            </li>
            <li className="my-1 mx-2">
              <NavLink
                to="/compras"
                className={({ isActive }) =>
                  isActive
                    ? "p-3 flex items-center rounded-md bg-primary bg-opacity-100 text-white"
                    : "p-3 flex items-center rounded-md hover:bg-primary bg-opacity-100"
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                </svg>
                <p className='ml-2'> Gestión de Compras</p>
              </NavLink>
            </li>
            <li className="my-1 mx-2">
              <NavLink
                to="/ventas"
                className={({ isActive }) =>
                  isActive
                    ? "p-3 flex items-center rounded-md bg-primary bg-opacity-100 text-white"
                    : "p-3 flex items-center rounded-md hover:bg-primary bg-opacity-100"
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
                <p className='ml-2'>Gestión de Ventas</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
