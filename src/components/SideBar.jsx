import { HomeIcon, SunIcon, ViewColumnsIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function SideBar() {
  return (
    <div className='h-screen'>
      <aside className="bg-white text-dark w-72 h-screen font-bold drop-shadow-lg">
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
                <HomeIcon className="h-5 w-5 mr-2" />
                Dashboard
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
                <SunIcon className="h-5 w-5 mr-2" />
                Gestión de Productos
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
                to="/proveedores"
                className={({ isActive }) =>
                  isActive
                    ? "p-3 flex items-center rounded-md bg-primary bg-opacity-100 text-white"
                    : "p-3 flex items-center rounded-md hover:bg-primary bg-opacity-100"
                }
              >
                <SunIcon className="h-5 w-5 mr-2" />
                Gestión de Proveedores
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
                <SunIcon className="h-5 w-5 mr-2" />
                Gestión de Compras
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
