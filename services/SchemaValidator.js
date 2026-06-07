// services/SchemaValidator.js
export const SchemaValidator = {
    validateMission(data) {
        return {
            ...data,
            nome: data.nome.replace(/<[^>]*>?/gm, '').substring(0, 100),
            timestamp: data.timestamp || new Date().toISOString(),
            likes: 0
        };
    }
};