// ui/Renderer.js
export class Renderer {
    constructor(containerId) { 
        this.container = document.getElementById(containerId); 
    }

    renderMissions(missions) {
        if (!this.container) return;
        
        if (!missions || missions.length === 0) { 
            this.container.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #777;">
                    <p>Nenhuma missão ativa no momento.</p>
                    <small>Abra a câmera e inicie sua jornada!</small>
                </div>`; 
            return; 
        }

        this.container.innerHTML = '';
        
        missions.forEach(mission => {
            const card = document.createElement('div');
            card.className = 'missao-card';
            
            // Usamos a dificuldade para definir o estilo da badge
            const diffClass = mission.difficulty === 'hard' ? 'diff-hard' : 'diff-easy';
            const diffLabel = mission.difficulty === 'hard' ? 'Difícil' : 'Fácil';

            card.innerHTML = `
                <div class="card-info">
                    <strong>${mission.nome}</strong>
                    <div class="card-meta">
                        <span class="badge ${diffClass}">${diffLabel}</span>
                        <span class="badge-gold">+${mission.xp} XP</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn-abandon" data-id="${mission.id}" title="Abandonar">❌</button>
                    <button class="btn-check" data-id="${mission.id}" title="Concluir">✅</button>
                </div>
            `;
            this.container.appendChild(card);
        });
    }
}