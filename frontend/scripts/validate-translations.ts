// scripts/validate-translations.ts
import ru from '../src/i18n/translations/ru_translation.json' with {type: 'json'};
import en from '../src/i18n/translations/en_translation.json' with {type: 'json'};

function getAllKeys(obj: any, prefix = ''): string[] {
    return Object.keys(obj).reduce((keys: string[], key) => {
        const path = prefix ? `${prefix}.${key}` : key
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            return [...keys, ...getAllKeys(obj[key], path)]
        }
        return [...keys, path]
    }, [])
}

const enKeys = getAllKeys(en).sort()
const ruKeys = getAllKeys(ru).sort()

const missingInRu = enKeys.filter(key => !ruKeys.includes(key))
const missingInEn = ruKeys.filter(key => !enKeys.includes(key))

if (missingInRu.length > 0) {
    console.error('❌ Missing in RU:', missingInRu)
}

if (missingInEn.length > 0) {
    console.error('❌ Missing in EN:', missingInEn)
}

if (missingInRu.length === 0 && missingInEn.length === 0) {
    console.log('✅ All translations are in sync!')
}
