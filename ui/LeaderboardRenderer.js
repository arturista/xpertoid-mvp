// ui/LeaderboardRenderer.js
export class LeaderboardRenderer {
    constructor(containerId) { this.container = document.getElementById(containerId); }

    render(history) {
        if (!this.container) return;
        const sorted = [...history].sort((a, b) => b.xp - a.xp).slice(0, 5);
        this.container.innerHTML = '<h3>🏆 Hall da Fama</h3>';
        sorted.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'leaderboard-row';
            row.innerHTML = `<span>#${index + 1}</span> <strong>${item.nome}</strong> <span class="xp-badge">${item.xp} XP</span>`;
            this.container.appendChild(row);
        });
    }
}