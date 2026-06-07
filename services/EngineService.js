// services/EngineService.js
export class EngineService {
    constructor() { this.XP_BASE = 20; }

    calculateXP(difficulty = 'easy') {
        const multipliers = { easy: 1.0, hard: 2.0 };
        return Math.floor(this.XP_BASE * (multipliers[difficulty] || 1.0));
    }

    processMissionCompletion(mission, currentStats) {
        const xpGained = this.calculateXP(mission.difficulty);
        let updatedStats = { ...currentStats, xp: currentStats.xp + xpGained };

        // Lógica de Subida de Nível (Exponencial)
        const nextLevelGoal = Math.floor(100 * Math.pow(1.2, updatedStats.lvl - 1));
        if (updatedStats.xp >= nextLevelGoal) {
            updatedStats.lvl++;
            updatedStats.xp = 0;
        }
        return updatedStats;
    }
}