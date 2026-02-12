const stageIds = ['splashStage', 'authStage', 'appStage'];

function showStage(id) {
  stageIds.forEach((stageId) => {
    const el = document.getElementById(stageId);
    el.classList.toggle('active', stageId === id);
  });
}

const authTabs = document.querySelectorAll('.auth-tab');
const loginPanel = document.getElementById('loginPanel');
const registerPanel = document.getElementById('registerPanel');

function switchAuthPanel(type) {
  authTabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.auth === type));
  loginPanel.classList.toggle('active', type === 'login');
  registerPanel.classList.toggle('active', type === 'register');
}

document.getElementById('enterAuthBtn').addEventListener('click', () => {
  showStage('authStage');
  switchAuthPanel('login');
});

document.getElementById('backSplashBtn').addEventListener('click', () => showStage('splashStage'));
document.getElementById('loginBtn').addEventListener('click', () => showStage('appStage'));
document.getElementById('registerBtn').addEventListener('click', () => showStage('appStage'));
authTabs.forEach((tab) => tab.addEventListener('click', () => switchAuthPanel(tab.dataset.auth)));

const tabs = document.querySelectorAll('.tab');
const screens = document.querySelectorAll('.screen');
const quickButtons = document.querySelectorAll('[data-nav-target]');
const screenTitle = document.getElementById('screenTitle');

function switchScreen(target) {
  screens.forEach((screen) => {
    const active = screen.id === target;
    screen.classList.toggle('active', active);
    if (active && screenTitle) screenTitle.textContent = screen.dataset.title || '首页';
  });
  tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.screen === target));
}

tabs.forEach((tab) => tab.addEventListener('click', () => switchScreen(tab.dataset.screen)));
quickButtons.forEach((btn) => btn.addEventListener('click', () => switchScreen(btn.dataset.navTarget)));

const detectionPresets = [
  { stress: '35%', emotion: '平静', tip: '建议：状态稳定，可进行 3 分钟巩固疗愈。' },
  { stress: '57%', emotion: '焦虑', tip: '建议：检测到紧张波动，推荐森林呼吸疗愈。' },
  { stress: '43%', emotion: '轻度疲惫', tip: '建议：降低亮度并播放舒缓音乐。' },
  { stress: '28%', emotion: '愉悦', tip: '建议：可进入短时冥想维持专注。' }
];

const simulateBtn = document.getElementById('simulateBtn');
const stressValue = document.getElementById('stressValue');
const detectEmotion = document.getElementById('detectEmotion');
const detectDesc = document.getElementById('detectDesc');
const homeEmotion = document.getElementById('homeEmotion');
const homeScore = document.getElementById('homeScore');
const homeTip = document.getElementById('homeTip');

function applyDetectionPreset(preset) {
  const score = 100 - Number.parseInt(preset.stress, 10);
  stressValue.textContent = preset.stress;
  detectEmotion.textContent = `检测结果：${preset.emotion}`;
  detectDesc.textContent = preset.tip;
  homeEmotion.textContent = preset.emotion;
  homeScore.textContent = String(score);
  homeTip.textContent = preset.tip;
}

simulateBtn.addEventListener('click', () => {
  const preset = detectionPresets[Math.floor(Math.random() * detectionPresets.length)];
  applyDetectionPreset(preset);
});

const genSteps = Array.from(document.querySelectorAll('#genTimeline .step'));
const advanceGenBtn = document.getElementById('advanceGenBtn');
let activeStep = 1;
advanceGenBtn.addEventListener('click', () => {
  if (activeStep < genSteps.length) {
    genSteps[activeStep - 1].classList.remove('active');
    genSteps[activeStep - 1].classList.add('done');
    genSteps[activeStep].classList.add('active');
    activeStep += 1;
  } else {
    genSteps.forEach((step, index) => {
      step.classList.remove('done', 'active');
      if (index === 0) step.classList.add('done');
      if (index === 1) step.classList.add('active');
    });
    activeStep = 1;
  }
});
