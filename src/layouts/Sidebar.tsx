import { Link } from 'react-router-dom';

type SidebarProps = {
    collapsed: boolean;
}
export default function Sidebar({collapsed}: SidebarProps) {
  return (
    <aside className={`bg-gray-800 text-white ${
        collapsed ? 'w-20' : 'w-64'
      } transition-all duration-300 ease-in-out min-h-screen fixed top-0 left-0 z-20`}>
      <h2 className={`text-xl font-bold mb-6 ${collapsed && 'hidden'}`}>AdminLTE</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded text-sm">Dashboard</Link>
        <Link to="/register" className="hover:bg-gray-700 p-2 rounded text-sm">Usuarios</Link>
        <Link to="/articulos" className="hover:bg-gray-700 p-2 rounded text-sm">Articulos</Link>
      </nav>
    </aside>
  );
}