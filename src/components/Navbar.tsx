import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user } = useAuth(); // Obtener el usuario desde el contexto

  // Log para depuración
  console.log('Usuario actual:', user);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Utensils className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">ReserveTable</span>
            </Link>
          </div>

          {/* Links condicionales según el rol */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* SuperAdmin Links */}
                {user.role_id === 3 && (
                  <Link
                    to="/admin/restaurants"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Restaurantes
                  </Link>
                )}

                {/* Admin Links */}
                {user.role_id === 2 && (
                  <>
                    <Link
                      to="/restaurant-admin"
                      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/restaurant-admin/tables"
                      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Mesas
                    </Link>
                  </>
                )}

                {/* Usuario Links */}
                {user.role_id === 1 && (
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Inicio
                  </Link>
                )}

                {/* Logout */}
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                {/* Links públicos (no autenticados) */}
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
