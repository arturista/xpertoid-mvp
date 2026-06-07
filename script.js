// ==========================================
// 1. LÓGICA DO MODAL DA CÂMERA E VÍDEO REAL
// ==========================================
const botaoAbrir = document.querySelector('.btn-menu-acao'); 
const botaoFechar = document.getElementById('btn-fechar'); 
const botaoCapturar = document.getElementById('btn-capturar'); 
const modal = document.getElementById('modal-camera'); 
const videoCamera = document.getElementById('stream-camera'); // O elemento de vídeo

let fluxoCamera = null; // Variável para guardar o sinal da câmera e poder desligar depois

// Função auxiliar para desligar a câmera quando fechar a janela
function desligarCamera() {
    if (fluxoCamera) {
        fluxoCamera.getTracks().forEach(track => track.stop());
    }
}

botaoAbrir.addEventListener('click', function() {
    modal.classList.remove('modal-oculto');
    modal.classList.add('modal-ativo');
    
    // Pede permissão e liga a câmera real
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(function(stream) {
            fluxoCamera = stream;
            videoCamera.srcObject = stream;
        })
        .catch(function(err) {
            console.error("Erro ao acessar a câmera: ", err);
            alert("Não foi possível acessar a câmera do seu dispositivo.");
        });
});

botaoFechar.addEventListener('click', function() {
    modal.classList.remove('modal-ativo');
    modal.classList.add('modal-oculto');
    desligarCamera(); // Desliga a luzinha da câmera
});

botaoCapturar.addEventListener('click', function() {
    alert('Take registrado com sucesso! 🎬 A guilda vai avaliar a sua cena para liberar o XP.');
    modal.classList.remove('modal-ativo');
    modal.classList.add('modal-oculto');
    desligarCamera(); // Desliga a luzinha da câmera
});

// ==========================================
// 2. LÓGICA DE NAVEGAÇÃO DE TELAS
// ==========================================
const telaPerfil = document.getElementById('tela-perfil');
const telaFeed = document.getElementById('tela-feed');
const btnNavPerfil = document.getElementById('btn-nav-perfil');
const btnNavFeed = document.getElementById('btn-nav-feed');

btnNavFeed.addEventListener('click', function() {
    telaPerfil.classList.remove('ativa');
    telaPerfil.classList.add('oculta');
    telaFeed.classList.remove('oculta');
    telaFeed.classList.add('ativa');

    btnNavPerfil.classList.remove('ativo');
    btnNavFeed.classList.add('ativo');
});

btnNavPerfil.addEventListener('click', function() {
    telaFeed.classList.remove('ativa');
    telaFeed.classList.add('oculta');
    telaPerfil.classList.remove('oculta');
    telaPerfil.classList.add('ativa');

    btnNavFeed.classList.remove('ativo');
    btnNavPerfil.classList.add('ativo');
});

// ==========================================
// 3. LÓGICA DE XP E GAMIFICAÇÃO
// ==========================================
let xpAtual = 10;
let nivelAtual = 1;
const xpPorAprovacao = 50; 

const barraProgresso = document.getElementById('barra-progresso');
const textoXp = document.getElementById('texto-xp');
const badgeNivel = document.getElementById('badge-nivel');
const botoesAprovar = document.querySelectorAll('.btn-aprovar');

botoesAprovar.forEach(function(botao) {
    botao.addEventListener('click', function() {
        if (botao.classList.contains('btn-aprovado')) {
            return;
        }

        botao.classList.add('btn-aprovado');
        botao.innerHTML = '✅ Aprovado';

        xpAtual = xpAtual + xpPorAprovacao;

        if (xpAtual >= 100) {
            nivelAtual = nivelAtual + 1; 
            xpAtual = xpAtual - 100; 
            
            badgeNivel.innerText = 'Lvl ' + nivelAtual;
            alert('🎉 LEVEL UP! O seu Xpertoid subiu para o Nível ' + nivelAtual + '!');
        }

        barraProgresso.style.width = xpAtual + '%';
        textoXp.innerText = xpAtual + ' / 100 XP para o Nível ' + (nivelAtual + 1);
    });
});