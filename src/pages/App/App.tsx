import React from 'react';
import { cn } from '@bem-react/classname';

import Search from 'pages/SearchPage';
import './App.scss';

const App: React.FC = () => {
    const cnApp = cn('App');

    return (
        <div className={cnApp()}>
            <div>
                <Search />
            </div>
        </div>
    );
};

export default App;
