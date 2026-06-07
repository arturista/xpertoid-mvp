// ui/FeedRenderer.js
export class FeedRenderer {
    constructor(containerId) { this.container = document.getElementById(containerId); }

    render(history) {
        if (!this.container) return;
        this.container.innerHTML = '<h3>Feed de Aventuras</h3>';
        history.slice().reverse().forEach(activity => {
            const item = document.createElement('div');
            item.className = 'feed-item';
            item.innerHTML = `
                <div class="feed-header"><strong>Você</strong> completou: <strong>${activity.nome}</strong></div>
                <div class="feed-actions">
                    <button class="btn-like" data-id="${activity.id}">❤️ ${activity.likes || 0}</button>
                </div>
            `;
            this.container.appendChild(item);
        });
    }
}