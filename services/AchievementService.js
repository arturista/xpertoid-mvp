// services/AchievementService.js
export class AchievementService {
    static checkAchievements(stats) {
        const newAchievements = [];
        if (stats.historico.length >= 1 && !stats.conquistas.includes('Iniciante')) newAchievements.push('Iniciante');
        if (stats.streak >= 7 && !stats.conquistas.includes('Inabalável')) newAchievements.push('Inabalável');
        return newAchievements;
    }
}