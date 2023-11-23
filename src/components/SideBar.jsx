import { HomeIcon, SunIcon, ViewColumnsIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';

export default function SideBar() {
  return (
    <aside className="bg-white text-dark w-72 min-h-[calc(100vh-64px)] font-bold drop-shadow-lg">
      <div className="mb-8 bg-primary p-4">
        <h2 className="text-2xl font-bold">Mi Sidebar</h2>
      </div>
      <nav>
        <ul >
          {/* p-3 flex items-center rounded-md hover:bg-firstop bg-opacity-100 hover:text-primary */}
          <li className="my-1 mx-2">
            <NavLink to="/"
              className={({ isActive }) => (isActive ? "p-3 flex items-center rounded-md bg-primary bg-opacity-100" : "p-3 flex items-center rounded-md hover:bg-primary bg-opacity-100")}
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li className="my-1 mx-2">
            <NavLink to="/productos"
              className={({ isActive }) => (isActive ? "p-3 flex items-center rounded-md bg-primary bg-opacity-100" : "p-3 flex items-center rounded-md hover:bg-primary bg-opacity-100")}
            >
              <SunIcon className="h-5 w-5 mr-2" />
              Gestión de Productos
            </NavLink>
          </li>
          <li className="my-1 mx-2">
            <NavLink to="/categorias"
              className={({ isActive }) => (isActive ? "p-3 flex items-center rounded-md bg-primary bg-opacity-100" : "p-3 flex items-center rounded-md hover:bg-primary bg-opacity-100")}
            >
              <ViewColumnsIcon className="h-5 w-5 mr-2" />
              Gestión de Categorias
            </NavLink>
          </li>
          <li className="my-1 mx-2">
            <NavLink to="/proveedores"
              className={({ isActive }) => (isActive ? "p-3 flex items-center rounded-md bg-primary bg-opacity-100" : "p-3 flex items-center rounded-md hover:bg-primary bg-opacity-100")}
            >
              <SunIcon className="h-5 w-5 mr-2" />
              Gestión de Proveedores
            </NavLink>
          </li>
          <li className="my-1 mx-2">
            <NavLink to="/compras"
              className={({ isActive }) => (isActive ? "p-3 flex items-center rounded-md bg-primary bg-opacity-100" : "p-3 flex items-center rounded-md hover:bg-primary bg-opacity-100")}
            >
              <SunIcon className="h-5 w-5 mr-2" />
              Gestión de Compras
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}