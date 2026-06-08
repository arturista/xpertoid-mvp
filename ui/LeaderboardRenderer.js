// ui/LeaderboardRenderer.js
export class LeaderboardRenderer {
    constructor(containerId) { 
        this.container = document.getElementById(containerId); 
    }

    render(history) {
        if (!this.container) return;
        
        if (!history || history.length === 0) {
            this.container.innerHTML = '<p style="text-align:center; padding: 20px; color: #777;">Complete missões para aparecer no ranking.</p>';
            return;
        }

        // Ordena por XP (Decrescente) e pega os 5 melhores
        const sorted = [...history].sort((a, b) => b.xp - a.xp).slice(0, 5);
        
        this.container.innerHTML = '<h3 style="margin-bottom: 15px; color: #444;">🏆 Hall da Fama (Maior XP)</h3>';
        
        sorted.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'leaderboard-row';
            
            // Destaque visual para o Top 1
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
            
            row.innerHTML = `
                <span style="font-size: 18px; width: 30px;">${medal}</span> 
                <strong style="flex: 1; margin-left: 10px;">${item.nome}</strong> 
                <span class="xp-badge">${item.xp} XP</span>
            `;
            this.container.appendChild(row);
        });
    }
}