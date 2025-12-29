// TodayPage.tsx
import {useTranslation} from 'react-i18next';

export default function TodayPage() {
    const {t} = useTranslation();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900">
                    {t('today.title')}
                </h1>
                <p className="mt-4 text-gray-600">
                    {t('today.content')}
                </p>
            </div>
        </div>
    );
}