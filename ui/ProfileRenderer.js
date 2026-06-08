// ui/ProfileRenderer.js
export class ProfileRenderer {
    constructor(containerId) { 
        this.container = document.getElementById(containerId); 
    }

    render(stats) {
        if (!this.container) return;

        // Prevenção de falhas com valores nulos
        const nivel = stats.lvl || 1;
        const xpAtual = stats.xp || 0;
        const conquistas = stats.conquistas || [];

        const nextLevelXP = Math.floor(100 * Math.pow(1.2, nivel - 1));
        const progress = Math.min((xpAtual / nextLevelXP) * 100, 100); // Trava em 100% no visual
        
        const badges = conquistas.length > 0 
            ? conquistas.map(c => `<span class="badge-gold">🏆 ${c}</span>`).join('') 
            : '<span style="font-size: 12px; opacity: 0.8;">Nenhuma conquista ainda.</span>';

        this.container.innerHTML = `
            <div class="profile-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="margin-bottom: 5px;">Nível ${nivel}</h2>
                    <span style="font-size: 20px;">🛡️</span>
                </div>
                
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
                
                <div style="display: flex; justify-content: space-between; font-size: 12px;">
                    <span>XP Acumulado</span>
                    <span>${Math.floor(xpAtual)} / ${nextLevelXP} XP</span>
                </div>
                
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.2);">
                    <div style="font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Conquistas</div>
                    <div class="badges-list">${badges}</div>
                </div>
            </div>
        `;
    }
}