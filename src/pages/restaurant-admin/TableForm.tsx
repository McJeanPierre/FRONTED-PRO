import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tableApi } from '../../services/tableApi';
import { TableFormData, Table } from '../../types/table';
import toast from 'react-hot-toast';

const TableForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<TableFormData>({
    numero_mesa: 0,
    capacidad: 2,
    disponible: true,
  });

  useEffect(() => {
    if (id) {
      fetchTable();
    }
  }, [id]);

  const fetchTable = async () => {
    try {
      const response = await tableApi.getAll();
      const table = response.data.find((t: Table) => t.id === Number(id));
      if (table) {
        setFormData(table);
      }
    } catch (error) {
      toast.error('Error al cargar la mesa');
      navigate('/restaurant-admin/tables');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Datos enviados:', formData); // Verificar datos
    

    try {
      if (id) {
        await tableApi.update(Number(id), formData);
        toast.success('Mesa actualizada con éxito');
      } else {
        await tableApi.create(formData);
        toast.success('Mesa creada con éxito');
      }
      navigate('/restaurant-admin/tables');
    } catch (error) {
      toast.error('Error al guardar la mesa');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {id ? 'Editar Mesa' : 'Nueva Mesa'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="numero_mesa" className="block text-sm font-medium text-gray-700">
            Número de Mesa
          </label>
          <input
            type="number"
            name="numero_mesa"
            id="numero_mesa"
            required
            min="1"
            value={formData.numero_mesa}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="capacidad" className="block text-sm font-medium text-gray-700">
            Capacidad (personas)
          </label>
          <input
            type="number"
            name="capacidad"
            id="capacidad"
            required
            min="1"
            value={formData.capacidad}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="disponible"
            id="disponible"
            checked={formData.disponible}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="disponible" className="ml-2 block text-sm text-gray-900">
            Disponible
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/restaurant-admin/tables')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TableForm;
