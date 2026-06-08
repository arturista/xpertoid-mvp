// ui/NotificationService.js
export class NotificationService {
    static show(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        // Cores diferentes baseadas no tipo de notificação
        if (type === 'error') {
            toast.style.background = '#e74c3c';
        } else if (type === 'info') {
            toast.style.background = '#3498db';
        }

        toast.innerText = message;
        document.body.appendChild(toast);
        
        // Remove automaticamente após 2.5 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s';
            setTimeout(() => toast.remove(), 500);
        }, 2500);
    }
}