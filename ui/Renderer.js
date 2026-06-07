// ui/Renderer.js
export class Renderer {
    constructor(containerId) { this.container = document.getElementById(containerId); }

    renderMissions(missions) {
        if (!this.container) return;
        if (missions.length === 0) { this.container.innerHTML = '<p style="text-align:center;">Nenhuma missão ativa.</p>'; return; }

        this.container.innerHTML = '';
        missions.forEach(mission => {
            const card = document.createElement('div');
            card.className = 'missao-card';
            card.innerHTML = `
                <div class="card-info">
                    <strong>${mission.nome}</strong>
                    <div class="card-meta">
                        <span class="badge diff-${mission.difficulty || 'easy'}">${mission.difficulty || 'Fácil'}</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn-abandon" data-id="${mission.id}">❌</button>
                    <button class="btn-check" data-id="${mission.id}">✅</button>
                </div>
            `;
            this.container.appendChild(card);
        });
    }
}