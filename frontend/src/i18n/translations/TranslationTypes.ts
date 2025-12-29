export interface TranslationTypes {
    translation: {
        menu: {
            home: string;
            today: string;
            my: string;
            login: string;
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
        };
    };
}