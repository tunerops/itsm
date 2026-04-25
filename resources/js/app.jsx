import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        // Загружаем все возможные варианты файлов (JSX и TypeScript)
        const pages = import.meta.glob('./Pages/**/*.{jsx,tsx,js,ts}');
        
        let path = `./Pages/${name}.jsx`;
        // Если JSX не найден, переключаемся на TSX (частая ловушка Breeze)
        if (!pages[path]) path = `./Pages/${name}.tsx`;
        if (!pages[path]) path = `./Pages/${name}.js`;
        
        return resolvePageComponent(path, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
