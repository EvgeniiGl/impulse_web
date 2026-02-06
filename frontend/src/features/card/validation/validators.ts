// import {VALIDATION_RULES, ERROR_MESSAGES} from './constants';
// import {CardFormData, CardFormValidationErrors} from "@store/card/cardSlice.ts";
//
// export const validateTitle = (
//     title: string,
//     t: (key: string) => string
// ): string | undefined => {
//     const trimmedTitle = title.trim();
//
//     if (!trimmedTitle) {
//         return t(ERROR_MESSAGES.TITLE_REQUIRED);
//     }
//
//     if (trimmedTitle.length > VALIDATION_RULES.MAX_TITLE_LENGTH) {
//         return t(ERROR_MESSAGES.TITLE_TOO_LONG);
//     }
//
//     return undefined;
// };
//
// export const validateDescription = (
//     description: string,
//     t: (key: string) => string
// ): string | undefined => {
//     if (description && description.length > VALIDATION_RULES.MAX_DESCRIPTION_LENGTH) {
//         return t(ERROR_MESSAGES.DESCRIPTION_TOO_LONG);
//     }
//
//     return undefined;
// };
//
// export const validateFile = (
//     file: File | null,
//     t: (key: string) => string
// ): string | undefined => {
//     if (!file) {
//         return t(ERROR_MESSAGES.FILE_REQUIRED);
//     }
//
//     if (!VALIDATION_RULES.ALLOWED_FILE_TYPES.includes(file.type)) {
//         return t(ERROR_MESSAGES.INVALID_FILE_TYPE);
//     }
//
//     if (file.size > VALIDATION_RULES.MAX_FILE_SIZE) {
//         return t(ERROR_MESSAGES.FILE_TOO_LARGE);
//     }
//
//     return undefined;
// };
//
// export const validateCardForm = (
//     formData: CardFormData,
//     t: (key: string) => string
// ): CardFormValidationErrors => {
//     const errors: CardFormValidationErrors = {};
//
//     const titleError = validateTitle(formData.title, t);
//     if (titleError) errors.title = titleError;
//
//     const descriptionError = validateDescription(formData.description, t);
//     if (descriptionError) errors.description = descriptionError;
//
//     const fileError = validateFile(formData.file, t);
//     if (fileError) errors.file = fileError;
//
//     return errors;
// };
