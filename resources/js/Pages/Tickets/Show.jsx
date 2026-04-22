import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, Send } from 'lucide-react';

// Компонент для отображения страницы конкретной заявки
const Show = ({ ticket }) => {
    // Инициализация формы для добавления комментария
    const { data, setData, post, processing, reset, errors } = useForm({
        ticket_id: ticket.id,
        body: '',
    });

    // Обработчик отправки комментария
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/comments', {
            onSuccess: () => reset('body'),
        });
    };

    // Функция для получения цвета бейджа статуса
    const getStatusBadge = (status) => {
        switch (status) {
            case 'open':
            case 'new':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <AlertCircle className="w-3 h-3" />
                        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                    </span>
                );
            case 'in_progress':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3" />
                        In Progress
                    </span>
                );
            case 'closed':
            case 'resolved':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3 h-3" />
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {status}
                    </span>
                );
        }
    };

    // Функция для получения цвета приоритета
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'text-red-600 font-semibold';
            case 'medium':
                return 'text-yellow-600 font-medium';
            case 'low':
                return 'text-green-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Кнопка возврата к списку */}
                <div className="mb-6">
                    <Link href="/tickets" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to tickets
                    </Link>
                </div>

                {/* Основная информация о заявке */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            #{ticket.id} - {ticket.title}
                        </h1>
                        <div className="flex items-center gap-3">
                            {getStatusBadge(ticket.status)}
                            <span className={`text-sm capitalize ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority} Priority
                            </span>
                        </div>
                    </div>

                    <div className="prose max-w-none text-gray-700 mb-6">
                        <p className="whitespace-pre-wrap">{ticket.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <div>
                            <strong>Author:</strong> {ticket.author?.name || 'Unknown'}
                        </div>
                        {ticket.assignee && (
                            <div>
                                <strong>Assignee:</strong> {ticket.assignee.name}
                            </div>
                        )}
                        <div>
                            <strong>Created:</strong> {new Date(ticket.created_at).toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Список комментариев */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Comments</h2>

                    {ticket.comments && ticket.comments.length > 0 ? (
                        <div className="space-y-4">
                            {ticket.comments.map((comment) => (
                                <div key={comment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-medium text-sm text-gray-900">
                                            {comment.user?.name || 'Unknown'}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(comment.created_at).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                                        {comment.body}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 bg-white rounded-xl border border-gray-200">
                            <p className="text-gray-500 text-sm">No comments yet.</p>
                        </div>
                    )}

                    {/* Форма добавления комментария */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                                    Add a comment
                                </label>
                                <textarea
                                    id="body"
                                    rows={3}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                    placeholder="Type your comment here..."
                                    value={data.body}
                                    onChange={(e) => setData('body', e.target.value)}
                                    disabled={processing}
                                />
                                {errors.body && (
                                    <p className="mt-1 text-sm text-red-600">{errors.body}</p>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing || !data.body.trim()}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
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
