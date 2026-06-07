// ui/NotificationService.js
export class NotificationService {
    static show(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
}