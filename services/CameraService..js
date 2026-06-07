// services/CameraService.js
export class CameraService {
    constructor(videoElement) { this.video = videoElement; this.stream = null; }

    async start() {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        this.video.srcObject = this.stream;
    }

    stop() {
        if (this.stream) this.stream.getTracks().forEach(t => t.stop());
    }

    captureImage() {
        const canvas = document.createElement('canvas');
        canvas.width = 640; canvas.height = 480;
        canvas.getContext('2d').drawImage(this.video, 0, 0, 640, 480);
        return canvas.toDataURL('image/webp', 0.5);
    }
}