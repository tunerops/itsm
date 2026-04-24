import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Clock, AlertCircle, CheckCircle2, User, Send } from 'lucide-react';

// Компонент для отображения страницы заявки с комментариями
const Show = ({ ticket }) => {
    // Используем useForm для управления формой нового комментария
    const { data, setData, post, processing, reset, errors } = useForm({
        body: '',
    });

    // Функция для получения цвета бейджа статуса
    const getStatusBadge = (status) => {
        switch (status) {
            case 'open':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <AlertCircle className="w-4 h-4" />
                        Open
                    </span>
                );
            case 'in_progress':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-4 h-4" />
                        In Progress
                    </span>
                );
            case 'closed':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircle2 className="w-4 h-4" />
                        Closed
                    </span>
                );
            case 'resolved':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircle2 className="w-4 h-4" />
                        Resolved
                    </span>
                );
            case 'new':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <AlertCircle className="w-4 h-4" />
                        New
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {status}
                    </span>
                );
        }
    };

    // Обработчик отправки комментария
    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/tickets/${ticket.id}/comments`, {
            onSuccess: () => reset('body'),
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Кнопка "Назад" */}
                <div className="mb-6">
                    <Link href="/tickets" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Tickets
                    </Link>
                </div>

                {/* Основная информация о заявке */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    {ticket.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                        {ticket.author?.name || 'Unknown User'}
                                    </span>
                                    <span>•</span>
                                    <span>#{ticket.id}</span>
                                    <span>•</span>
                                    <span className="capitalize">Priority: {ticket.priority}</span>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                {getStatusBadge(ticket.status)}
                            </div>
                        </div>

                        <div className="prose max-w-none text-gray-700">
                            <p className="whitespace-pre-wrap">{ticket.description}</p>
                        </div>
                    </div>
                </div>

                {/* Секция комментариев */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Comments</h2>

                    {/* Список комментариев */}
                    <div className="space-y-4">
                        {ticket.comments && ticket.comments.length > 0 ? (
                            ticket.comments.map((comment) => (
                                <div key={comment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                                            {comment.user?.name ? comment.user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {comment.user?.name || 'Unknown User'}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(comment.created_at).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 whitespace-pre-wrap text-sm">
                                        {comment.body}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6 bg-white rounded-lg border border-gray-200 border-dashed">
                                <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
                            </div>
                        )}
                    </div>

                    {/* Форма добавления комментария */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                                    Add a Comment
                                </label>
                                <textarea
                                    id="body"
                                    rows={4}
                                    className={`w-full rounded-lg border ${errors.body ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} shadow-sm p-3`}
                                    placeholder="Type your comment here..."
                                    value={data.body}
                                    onChange={(e) => setData('body', e.target.value)}
                                />
                                {errors.body && (
                                    <p className="mt-1 text-sm text-red-600">{errors.body}</p>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing || !data.body.trim()}
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                                >
                                    <Send className="w-4 h-4" />
                                    Post Comment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;
