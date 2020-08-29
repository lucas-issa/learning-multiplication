import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            'en': {
                translation: {
                    "App title": "Learning multiplication",
                    "Go": "Go",
                    "Reset": "Reset",
                    "Next": "Next",
                    "Reveal": "Reveal",
                    "Reveal all": "Reveal all",
                    "Global": "Global",
                    "Until reset": "Until reset",
                    "Type a number": "Type a number",
                    "Try again": "Try again",
                    "Congratulations!!!": "Congratulations!!!",
                    "Congratulations! You can be faster!": "Congratulations! You can be faster!",
                    "Right but slow": "Right but slow",
                    "To study": "To study",
                    "items": "items",
                    "Total negative points": "Total negative points",
                    "negative points": "negative points",
                }
            },
            'pt-BR': {
                translation: {
                    "App title": "Aprendendo multiplicação",
                    "Go": "Ir",
                    "Reset": "Limpar",
                    "Next": "Próximo",
                    "Reveal": "Revelar",
                    "Reveal all": "Revelar todos",
                    "Global": "Global",
                    "Until reset": "Até limpar",
                    "Type a number": "Digite um número",
                    "Try again": "Tente novamente",
                    "Congratulations!!!": "Parabéns!!!",
                    "Congratulations! You can be faster!": "Parabéns! Você pode ser mais rápido!",
                    "Right but slow": "Certo, mas lento",
                    "To study": "A estudar",
                    "items": "itens",
                    "Total negative points": "Total de pontos negativos",
                    "negative points": "pontos negativos",
                }
            },
        },
        // lng: "en",
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });
