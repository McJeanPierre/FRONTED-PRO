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
        ubicacion: 'centro',
        estado_mesa: true,
    });

    useEffect(() => {
      if (mesa_id) {
          console.log('Mesa ID:', mesa_id); // Verifica que el ID esté presente
          fetchTable();
      }
  }, [mesa_id]);

    const fetchTable = async () => {
        setLoading(true);
        try {
            const response = await tableApi.getOne(Number(mesa_id));
            const mesaData = response.data;
            setFormData({
                numero_mesa: mesaData.numero_mesa,
                capacidad: mesaData.capacidad,
                ubicacion: mesaData.ubicacion,
                estado_mesa: mesaData.estado_mesa ?? true,
            });
        } catch (error) {
            toast.error('Error al cargar los datos de la mesa');
            navigate('/restaurant-admin/tables');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (mesa_id) {
                await tableApi.update(Number(mesa_id), formData);
                toast.success('Mesa actualizada con éxito');
            } else {
                await tableApi.create(formData);
                toast.success('Mesa creada con éxito');
            }
            navigate('/restaurant-admin/tables');
        } catch (error) {
            toast.error('Error al guardar la mesa');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                {mesa_id ? 'Editar Mesa' : 'Nueva Mesa'}
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
                <div>
                    <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">
                        ubicacion (mesa)
                    </label>
                    <input
                        type="text"
                        name="ubicacion"
                        id="ubicacion"
                        required
                        value={formData.ubicacion}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="estado_mesa"
                        id="estado_mesa"
                        checked={formData.estado_mesa}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="estado_mesa" className="ml-2 block text-sm text-gray-900">
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
                        {loading ? 'Guardando...' : mesa_id ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TableForm;
