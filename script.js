// script.js
import { StorageService } from './services/StorageService.js';
import { SchemaValidator } from './services/SchemaValidator.js';
import { EngineService } from './services/EngineService.js';
import { CameraService } from './services/CameraService.js';
import { AchievementService } from './services/AchievementService.js';
import { NotificationService } from './ui/NotificationService.js';
import { Renderer } from './ui/Renderer.js';
import { FeedRenderer } from './ui/FeedRenderer.js';
import { ProfileRenderer } from './ui/ProfileRenderer.js';
import { LeaderboardRenderer } from './ui/LeaderboardRenderer.js';

const storage = new StorageService();
const ui = new Renderer('container-missoes');
const feedUI = new FeedRenderer('container-feed');
const profileUI = new ProfileRenderer('profile-section');
const lbUI = new LeaderboardRenderer('container-leaderboard');
const engine = new EngineService();
const camera = new CameraService(document.getElementById('video-feed'));

let appState = { xp: 0, lvl: 1, streak: 0, missoes: [], historico: [], conquistas: [] };

async function bootstrap() {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
    await storage.init();
    const savedData = await storage.loadAppState();
    if (savedData) appState = savedData;
    renderAll();
}

function renderAll() {
    ui.renderMissions(appState.missoes);
    feedUI.render(appState.historico);
    profileUI.render(appState);
    lbUI.render(appState.historico);
}

window.showTab = (tabId) => {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');
    renderAll();
};

document.addEventListener('click', async (e) => {
    const id = parseInt(e.target.dataset.id);
    if (!id) return;

    // Concluir Missão
    if (e.target.classList.contains('btn-check')) {
        const mission = appState.missoes.find(m => m.id === id);
        appState = engine.processMissionCompletion(mission, appState);
        appState.missoes = appState.missoes.filter(m => m.id !== id);
        appState.historico.push(mission);
        
        // Verifica Conquistas
        const novas = AchievementService.checkAchievements(appState);
        if(novas.length > 0) appState.conquistas.push(...novas);

        await storage.saveAll(appState);
        renderAll();
        NotificationService.show(`Concluído! +${mission.xp} XP`);
    }

    // Like
    if (e.target.classList.contains('btn-like')) {
        const activity = appState.historico.find(a => a.id === id);
        if (activity) {
            activity.likes = (activity.likes || 0) + 1;
            await storage.saveAll(appState);
            renderAll();
        }
    }
});

// Inicialização de botões
document.getElementById('btn-abrir-camera').onclick = () => { 
    document.getElementById('modal-camera').classList.remove('hidden'); 
    camera.start(); 
};
document.getElementById('btn-cancelar').onclick = () => { 
    document.getElementById('modal-camera').classList.add('hidden'); 
    camera.stop(); 
};
document.getElementById('btn-capturar').onclick = async () => {
    const novaMissao = SchemaValidator.validateMission({
        id: Date.now(),
        nome: prompt("Nome da missão:"),
        xp: 20,
        difficulty: 'easy'
    });
    appState.missoes.push(novaMissao);
    await storage.saveAll(appState);
    document.getElementById('modal-camera').classList.add('hidden');
    camera.stop();
    renderAll();
};

bootstrap();