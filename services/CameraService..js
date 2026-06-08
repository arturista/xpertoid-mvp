// services/CameraService.js
export class CameraService {
    constructor(videoElement) { 
        this.video = videoElement; 
        this.stream = null; 
    }

    async start() {
        try {
            // Tenta forçar a câmera traseira em celulares
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            this.video.srcObject = this.stream;
        } catch (error) {
            console.error("Acesso à câmera negado ou indisponível.", error);
            throw new Error("Não foi possível acessar a câmera.");
        }
    }

    stop() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.video.srcObject = null;
        }
    }

    captureImage() {
        const canvas = document.createElement('canvas');
        canvas.width = 640; 
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
        
        // Retorna a imagem em WebP (mais leve) com 50% de qualidade
        return canvas.toDataURL('image/webp', 0.5);
    }
}