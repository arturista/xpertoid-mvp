// services/AchievementService.js
export class AchievementService {
    static checkAchievements(stats) {
        const newAchievements = [];
        
        // Proteção contra estados nulos
        const historicoCount = stats.historico ? stats.historico.length : 0;
        const conquistasAtuais = stats.conquistas || [];

        // Regras de Conquistas
        if (historicoCount >= 1 && !conquistasAtuais.includes('Primeiro Passo')) {
            newAchievements.push('Primeiro Passo');
        }
        if (historicoCount >= 10 && !conquistasAtuais.includes('Aventureiro')) {
            newAchievements.push('Aventureiro');
        }
        if (stats.lvl >= 5 && !conquistasAtuais.includes('Veterano')) {
            newAchievements.push('Veterano');
        }

        return newAchievements;
    }
}