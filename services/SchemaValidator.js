// services/SchemaValidator.js
export const SchemaValidator = {
    validateMission(data) {
        if (!data.nome || data.nome.trim() === '') {
            throw new Error("Sua missão precisa de um título válido.");
        }

        // Sanitização e definição de limites de caracteres
        const nomeSanitizado = data.nome.replace(/[<>]/g, '').trim().substring(0, 80);

        return {
            id: data.id || Date.now(),
            nome: nomeSanitizado,
            timestamp: data.timestamp || new Date().toISOString(),
            xp: Number(data.xp) || 20,
            difficulty: ['easy', 'medium', 'hard'].includes(data.difficulty) ? data.difficulty : 'easy',
            likes: Number(data.likes) || 0
        };
    }
};