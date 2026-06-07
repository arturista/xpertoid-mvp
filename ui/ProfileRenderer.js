// ui/ProfileRenderer.js
export class ProfileRenderer {
    constructor(containerId) { this.container = document.getElementById(containerId); }

    render(stats) {
        const nextLevelXP = 100 * Math.pow(1.2, stats.lvl - 1);
        const progress = (stats.xp / nextLevelXP) * 100;
        const badges = stats.conquistas ? stats.conquistas.map(c => `<span class="badge">${c}</span>`).join('') : '';

        this.container.innerHTML = `
            <div class="profile-card">
                <h2>Nível ${stats.lvl}</h2>
                <div class="progress-container"><div class="progress-bar" style="width: ${progress}%"></div></div>
                <small>${Math.floor(stats.xp)} / ${Math.floor(nextLevelXP)} XP</small>
                <div class="badges-list">${badges}</div>
            </div>
        `;
    }
}