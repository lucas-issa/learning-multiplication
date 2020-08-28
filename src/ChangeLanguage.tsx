import React from 'react';
import i18n from 'i18next';

export const ChangeLanguage = () => (
    <span className="change-language">
        <select
            value={i18n.language}
            onChange={(event) => {
                i18n.changeLanguage(event.target.value);
            }}
        >
            <option value="en">English</option>
            <option value="pt-BR">Português</option>
        </select>
    </span>
);