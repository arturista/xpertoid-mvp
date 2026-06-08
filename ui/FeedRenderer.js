// ui/FeedRenderer.js
export class FeedRenderer {
    constructor(containerId) { 
        this.container = document.getElementById(containerId); 
    }

    render(history) {
        if (!this.container) return;
        
        if (!history || history.length === 0) {
            this.container.innerHTML = '<p style="text-align:center; padding: 20px; color: #777;">O feed está silencioso. Complete uma missão para começar!</p>';
            return;
        }

        this.container.innerHTML = '<h3 style="margin-bottom: 15px; color: #444;">Feed de Aventuras</h3>';
        
        // slice().reverse() cria uma cópia e inverte para mostrar as mais recentes primeiro
        history.slice().reverse().forEach(activity => {
            const item = document.createElement('div');
            item.className = 'feed-item';
            
            const dataFormatada = new Date(activity.timestamp).toLocaleDateString('pt-BR');

            item.innerHTML = `
                <div class="feed-header">
                    <strong>Você</strong> completou a missão: <br>
                    <strong style="color: #1877f2;">${activity.nome}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; margin-top: 10px;">
                    <button class="btn-like" data-id="${activity.id}">❤️ ${activity.likes || 0}</button>
                    <small style="color: #888;">${dataFormatada}</small>
                </div>
            `;
            this.container.appendChild(item);
        });
    }
}