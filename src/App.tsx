import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantList from './pages/admin/RestaurantList';
import RestaurantForm from './pages/admin/RestaurantForm';
import Dashboard from './pages/restaurant-admin/Dashboard';
import TableList from './pages/restaurant-admin/TableList';
import TableForm from './pages/restaurant-admin/TableForm';
import ProtectedRoute from './components/ProtectedRoute';
import Pricing from './pages/Pricing';
import Checkout from './pages/Checkout';
import Settings from './pages/restaurant-admin/SettingsForm';
import ClientRestaurantList from './pages/client/RestaurantList';
import TableListClient from './pages/client/TableList';
import ReservationList from './pages/restaurant-admin/ReservationList';
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas para Cliente */}
            <Route element={<ProtectedRoute allowedRoles={[1]} redirectPath="/login" />}>
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/checkout/:planId" element={<Checkout />} />
              <Route path="/client/restaurants" element={<ClientRestaurantList />} />
              <Route path="/client/restaurants/:restaurantId/tables" element={<TableListClient />} />
            </Route>

            {/* Rutas protegidas para SuperAdmin */}
            <Route element={<ProtectedRoute allowedRoles={[3]} redirectPath="/login" />}>
              <Route path="/admin/restaurants" element={<RestaurantList />} />
              <Route path="/admin/restaurants/new" element={<RestaurantForm />} />
              <Route path="/admin/restaurants/edit/:id" element={<RestaurantForm />} />
            </Route>

            {/* Rutas protegidas para Admin */}
            <Route element={<ProtectedRoute allowedRoles={[2]} redirectPath="/login" />}>
              <Route path="/restaurant-admin" element={<Dashboard />} />
              <Route path="/restaurant-admin/tables" element={<TableList />} />
              <Route path="/restaurant-admin/tables/new" element={<TableForm />} />
              <Route path="/restaurant-admin/tables/edit/:mesa_id" element={<TableForm />} />
              <Route path="/restaurant-admin/settings" element={<Settings />} />
              <Route path="/restaurant-admin/reservations" element={<ReservationList />} />
            </Route>
          </Routes>

          
          <Toaster position="top-right" />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
