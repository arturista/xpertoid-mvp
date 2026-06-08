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

// Instanciação
const storage = new StorageService();
const ui = new Renderer('container-missoes');
const feedUI = new FeedRenderer('container-feed');
const profileUI = new ProfileRenderer('profile-section');
const lbUI = new LeaderboardRenderer('container-leaderboard');
const engine = new EngineService();
const camera = new CameraService(document.getElementById('video-feed'));

// Estado Global Default
let appState = { 
    xp: 0, 
    lvl: 1, 
    streak: 0, 
    missoes: [], 
    historico: [], 
    conquistas: [] 
};

// Inicialização
async function bootstrap() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => console.warn("Service Worker não registrado:", err));
    }
    
    try {
        await storage.init();
        const savedData = await storage.loadAppState();
        if (savedData) appState = savedData;
        renderAll();
    } catch (error) {
        NotificationService.show("Modo offline ativado (Sem banco de dados)", "info");
    }
}

// Atualização de Interface
function renderAll() {
    ui.renderMissions(appState.missoes);
    feedUI.render(appState.historico);
    profileUI.render(appState);
    lbUI.render(appState.historico);
}

// Lógica de Abas (Tabs)
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove 'active' de todos os botões e 'hidden' de todos os conteúdos
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
        
        // Ativa o botão clicado e mostra a aba correspondente
        const targetId = e.target.getAttribute('data-target');
        e.target.classList.add('active');
        document.getElementById(targetId).classList.remove('hidden');
        
        renderAll(); // Garante que os dados da aba estejam atualizados
    });
});

// Delegação de Eventos Principais (Ações nos Cards)
document.addEventListener('click', async (e) => {
    const id = parseInt(e.target.dataset.id);
    if (!id) return;

    // Ação: Concluir Missão
    if (e.target.classList.contains('btn-check')) {
        const mission = appState.missoes.find(m => m.id === id);
        if (mission) {
            appState = engine.processMissionCompletion(mission, appState);
            appState.missoes = appState.missoes.filter(m => m.id !== id);
            appState.historico.push(mission);
            
            // Verifica Conquistas
            const novasConquistas = AchievementService.checkAchievements(appState);
            if(novasConquistas.length > 0) {
                appState.conquistas.push(...novasConquistas);
                NotificationService.show(`Nova Conquista: ${novasConquistas[0]}!`, "success");
            }

            await storage.saveAll(appState);
            renderAll();
            NotificationService.show(`Missão Cumprida! +${mission.xp} XP`);
        }
    }

    // Ação: Abandonar Missão
    if (e.target.classList.contains('btn-abandon')) {
        if(confirm("Os verdadeiros heróis não desistem. Tem certeza que deseja abandonar a missão?")) {
            appState.missoes = appState.missoes.filter(m => m.id !== id);
            await storage.saveAll(appState);
            renderAll();
            NotificationService.show("Missão abandonada.", "info");
        }
    }

    // Ação: Dar Like no Feed
    if (e.target.classList.contains('btn-like')) {
        const activity = appState.historico.find(a => a.id === id);
        if (activity) {
            activity.likes = (activity.likes || 0) + 1;
            await storage.saveAll(appState);
            renderAll(); // Atualiza a tela para mostrar o like novo
        }
    }
});

// Controles da Câmera / Criação de Missões
document.getElementById('btn-abrir-camera').onclick = async () => { 
    document.getElementById('modal-camera').classList.remove('hidden'); 
    await camera.start(); 
};

document.getElementById('btn-cancelar').onclick = () => { 
    document.getElementById('modal-camera').classList.add('hidden'); 
    camera.stop(); 
};

document.getElementById('btn-capturar').onclick = async () => {
    try {
        const nomeDaMissao = prompt("Dê um nome para a sua missão:");
        
        // Pede a dificuldade
        const diffInput = prompt("Dificuldade (easy, medium, hard):", "easy");
        const difficulty = ['easy', 'medium', 'hard'].includes(diffInput) ? diffInput : 'easy';
        
        // A validação vai disparar um erro se o nome for vazio
        const novaMissao = SchemaValidator.validateMission({
            id: Date.now(),
            nome: nomeDaMissao,
            difficulty: difficulty,
            xp: engine.calculateXP(difficulty) // Usa a engine para calcular com base na dificuldade
        });

        // Tira a foto (se você for usar a variável foto no futuro, ela está pronta)
        // const foto = camera.captureImage(); 

        appState.missoes.push(novaMissao);
        await storage.saveAll(appState);
        
        document.getElementById('modal-camera').classList.add('hidden');
        camera.stop();
        renderAll();
        
        NotificationService.show("Missão registrada com sucesso!");
    } catch (erro) {
        NotificationService.show(erro.message, "error");
    }
};

// Inicia o App
bootstrap();