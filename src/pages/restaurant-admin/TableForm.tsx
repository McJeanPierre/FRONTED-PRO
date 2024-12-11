import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tableApi } from '../../services/tableApi';
import { TableFormData } from '../../types/table';
import toast from 'react-hot-toast';

const TableForm = () => {
  const navigate = useNavigate();
  const { mesa_id } = useParams<{ mesa_id: string }>();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<TableFormData>({
    numero_mesa: 0,
    capacidad: 2,
    disponibilidad: true,
  });

  
  useEffect(() => {
    if (mesa_id) {
      console.log('Mesa ID:', mesa_id); // Verifica que el ID esté presente
      fetchTable(mesa_id);
    }
  }, [mesa_id]);

  const fetchTable = async (id: string) => {
    setLoading(true);
    try {
      const response = await tableApi.getOne(Number(id));
      setFormData(response.data);
    } catch (error) {
      toast.error('Error al cargar la mesa');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mesa_id) {
        // Actualizar mesa existente
        console.log('Actualizando mesa:', mesa_id);
        await tableApi.update(Number(mesa_id), formData);
        toast.success('Mesa actualizada con éxito');
      } else {
        // Crear nueva mesa
        console.log('Creando nueva mesa');
        await tableApi.create(formData);
        toast.success('Mesa creada con éxito');
      }
      navigate('/restaurant-admin/tables');
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error('Error al guardar la mesa');
    } finally {
      setLoading(false);
    }

    console.log('Datos enviados:', formData);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Configuración de Mesa</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 space-y-6">
        <div>
          <label htmlFor="numero_mesa" className="block text-sm font-medium text-gray-700">
            Número de Mesa
          </label>
          <input
            type="number"
            name="numero_mesa"
            id="numero_mesa"
            required
            value={formData.numero_mesa}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="capacidad" className="block text-sm font-medium text-gray-700">
            Capacidad
          </label>
          <input
            type="number"
            name="capacidad"
            id="capacidad"
            required
            value={formData.capacidad}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="disponibilidad"
            id="disponibilidad"
            checked={formData.disponibilidad}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="disponibilidad" className="ml-2 block text-sm text-gray-900">
            Disponible
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};

export default TableForm;
