import React from 'react';
import './App.scss';
import {Multiplication} from './multiplication/Multiplication';
import {useTranslation} from 'react-i18next';
import {ChangeLanguage} from './ChangeLanguage';

function App() {
    const {t} = useTranslation();
    return (
        <div className="App">
            <header className="App-header">
                {t('App title')}
            </header>
            <ChangeLanguage />

            <Multiplication></Multiplication>
        </div>
    );
}

export default App;
