export interface TranslationTypes {
    translation: {
        app_name: string,
        menu: {
            home: string;
            today: string;
            my: string;
            login: string;
            create: string;
            "logout": string
        };
        home: {
            welcome: string;
            description: string;
            getStarted: string;
            learnMore: string;
            features: string;
            feature1: {
                title: string;
                description: string;
            };
            feature2: {
                title: string;
                description: string;
            };
            feature3: {
                title: string;
                description: string;
            };
        };
        today: {
            title: string;
            content: string;
        };
        my: {
            title: string;
            content: string;
        };
        login: {
            title: string;
            email: string;
            password: string;
            signIn: string;
            "noAccount": string;
            "createAccount": string;
        };
        loading: string,
        "common": {
            "back": string,
            "backToHome": string,
        }
        "register": {
            "title": string,
            "subtitle": string,
            "signInLink": string,
            "name": string,
            "email": string,
            "password": string,
            "confirmPassword": string,
            "passwordHint": string,
            "agreeToTerms": string,
            "termsOfService": string,
            "and": string,
            "privacyPolicy": string,
            "signUp": string,
            "orContinueWith": string,
            "errors": {
                "nameRequired": string,
                "lastNameRequired": string,
                "emailRequired": string,
                "emailInvalid": string,
                "passwordRequired": string,
                "passwordTooShort": string,
                "confirmPasswordRequired": string,
                "passwordsDoNotMatch": string,
                "termsRequired": string,
            }
        }
    };
}