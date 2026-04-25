import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    // Подключаем хук Inertia для удобной работы с формами
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        priority: 'medium',
    });

    // Обработчик отправки формы
    const submit = (e) => {
        e.preventDefault();
        post('/tickets'); // Отправляем POST запрос на наш метод store
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 mt-10">
            <Head title="Создать заявку" />
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Создать новую заявку</h1>

            <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow-md space-y-6 border border-gray-200">
                
                {/* Поле: Тема */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Тема проблемы</label>
                    <input
                        type="text"
                        id="title"
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm p-2 border"
                        placeholder="Например: Не работает принтер в 105 кабинете"
                    />
                    {errors.title && <div className="text-red-600 text-sm mt-1">{errors.title}</div>}
                </div>

                {/* Поле: Описание */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Подробное описание</label>
                    <textarea
                        id="description"
                        rows="4"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm p-2 border"
                        placeholder="Опишите проблему максимально подробно..."
                    ></textarea>
                    {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                </div>

                {/* Поле: Приоритет */}
                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Приоритет</label>
                    <select
                        id="priority"
                        value={data.priority}
                        onChange={e => setData('priority', e.target.value)}
                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm p-2 border"
                    >
                        <option value="low">Низкий</option>
                        <option value="medium">Средний</option>
                        <option value="high">Высокий</option>
                    </select>
                    {errors.priority && <div className="text-red-600 text-sm mt-1">{errors.priority}</div>}
                </div>

                {/* Кнопки */}
                <div className="flex items-center justify-end gap-4 border-t pt-4">
                    <Link href="/tickets" className="text-gray-500 hover:text-gray-800 font-medium text-sm transition">
                        Отмена
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 font-medium shadow-sm"
                    >
                        Сохранить заявку
                    </button>
                </div>
            </form>
        </div>
        </AuthenticatedLayout>
    );
}
