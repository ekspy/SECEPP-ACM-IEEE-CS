import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();

window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xFFFAEB);

camera.position.z = 10;
camera.lookAt(scene.position);

const light = new THREE.PointLight(0xFFFFFF);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 3);
scene.add(ambientLight);

// Modelos
const models = [];

const loadModel = (modelFilename, position) => {
  return new Promise((resolve, reject) => {
    loader.load(modelFilename, function (gltf) {
      const model = gltf.scene;
      model.position.set(position.x, position.y, position.z);
      scene.add(model);
      models.push(model);
      resolve();
    }, undefined, function (error) {
      reject(error);
    });
  });
};

// Posições
const modelPositions = [
  { x: -7.5, y: 0, z: -0.1 },
  { x: -2.5, y: 0, z: -0.1 },
  { x: 2.5, y: 0, z: -0.1 },
  { x: 7.5, y: 0, z: -0.1 },
  { x: -7.5, y: -4.5, z: -0.1 },
  { x: -2.5, y: -4.5, z: -0.1 },
  { x: 2.5, y: -4.5, z: -0.1 },
  { x: 7.5, y: -4.5, z: -0.1 }
];

const loadAndPositionModels = async () => {
  for (let i = 1; i <= 8; i++) {
    const modelFilename = `./number${i}.glb`;
    const position = modelPositions[i - 1];
    await loadModel(modelFilename, position).catch((error) => console.error(error));
  }
};

loadAndPositionModels();

const monitors = [];

const largeMonitorGeometry = new THREE.BoxGeometry(25, 4.5, 0.2);
const largeMonitorMaterial = new THREE.MeshBasicMaterial({ color: 0xCF4307 });
const largeMonitor = new THREE.Mesh(largeMonitorGeometry, largeMonitorMaterial);
largeMonitor.position.y = 5;
scene.add(largeMonitor);
monitors.push(largeMonitor);

// Monitores invisíveis para clickagem
const smallMonitorGeometry = new THREE.BoxGeometry(3.5, 3.5, 0.2);
const smallMonitorMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 });

for (let i = 0; i < 8; i++) {
  const smallMonitor = new THREE.Mesh(smallMonitorGeometry, smallMonitorMaterial);

  smallMonitor.position.x = (i % 4 - 1.5) * 5;
  smallMonitor.position.y = i < 4 ? 0 : -4.5;
  smallMonitor.position.z = -0.1;
  scene.add(smallMonitor);
  monitors.push(smallMonitor);
}

// Título principal
const textLabel = document.createElement("div");
textLabel.style.fontFamily = "Arial Rounded MT Bold";
textLabel.style.fontSize = "48px";
textLabel.style.alignContent = "center";
textLabel.style.position = "fixed";
textLabel.style.width = "988px";
textLabel.style.height = "auto";
textLabel.style.backgroundColor = "rgba(0, 0, 0, 0)";
textLabel.style.color = "white";
textLabel.style.top = "17%";
textLabel.style.left = "50%";
textLabel.style.transform = "translate(-50%, -50%)";
textLabel.innerHTML = "Os oito princípios éticos do engenheiro de software";
document.body.appendChild(textLabel);

// Textos dos princípios
const monitorContents = [
  `<div style="text-align: center; font-weight: bold; font-size: 36px; font-family: Cascadia-Code">Preâmbulo</div>
   <div style="text-align: justify"><p>Estes são os Oito Princípios sumarizados no Código de Ética e Conduta Profissional da Engenharia de Software aprovado 
   pela ACM (Association of Computing Machinery) e a IEEE-CS (Institute of Eletrical and Eletronic Engineers - Computer Society).</p>
   <p>A breve versão aqui apresentada sumariza as aspirações do código num alto nível de abstração. As cláusulas inclusas na
   versão completa dão exemplos e detalhes sobre estas aspirações. Caso haja interesse, pesquise.</p>
   <p>Engenheiros de software deverão se comprometer a fazer da análise, da especificação, do design, do desenvolvimento,
   do teste e do manuseio de software uma benéfica e respeitada profissão. De acordo com seu comprometimento para com a
   saúde, a segurança e o bem-estar do público, engenheiros de software deverão aderir aos seguintes Oito Princípios.</p></div>`,
  `<div style="text-align: center; font-weight: bold; font-size: 36px; font-family: Cascadia-Code">Princípio do Público</div>
   <div style="text-align: center; font-size: 24px"><p>Engenheiros de software deverão agir consistente com o interesse público.</p></div>`,
  `<div style="text-align: center; font-weight: bold; font-size: 36px; font-family: Cascadia-Code">Princípio do Trabalho</div>
  <div style="text-align: center; font-size: 24px"><p>Engenheiros de software deverão agir no melhor interesse dos
  clientes e dos empregadores, consistente com o interesse público.</p></div>`,
  `<div style="text-align: center; font-weight: bold; font-size: 36px; font-family: Cascadia-Code">Princípio do Produto</div>
  <div style="text-align: center; font-size: 24px"><p>Engenheiros de software deverão garantir que seus produtos e modificações
  estejam ao par dos mais altos padrões de qualidade possíveis.</p></div>`,
  `<div style="text-align: center; font-weight: bold; font-size: 36px; font-family: Cascadia-Code">Princípio do Julgamento</div>
  <div style="text-align: center; font-size: 24px"><p>Engenheiros de software deverão manter a integridade e a independência no
  seu julgamento profissional.</p></div>`,
  `<div style="text-align: center; font-weight: bold; font-size: 36px; font-family: Cascadia-Code">Princípio do Gerenciamento</div>
  <div style="text-align: center; font-size: 24px"><p>Líderes da engenharia de software deverão aderir e promover uma
  abordagem ética no gerencimento do desenvolvimento e manutenção de software.</p></div>`,
  `<div style="text-align: center; font-weight: bold; font-size: 36px; font-family: Cascadia-Code">Princípio da Profissão</div>
  <div style="text-align: center; font-size: 24px"><p>Engenheiros de software deverão promover a integridade e a reputação
  de sua profissão, consistente com o interesse público.</p></div>`,
  `<div style="text-align: center; font-weight: bold; font-size: 36px; font-family: Cascadia-Code">Princípio do Coletivo</div>
  <div style="text-align: center; font-size: 24px"><p>Engenheiros de software deverão ser justos e solidários para com seus colegas.</p></div>`,
   `<div style="text-align: center; font-weight: bold; font-size: 36px; font-family: Cascadia-Code">Princípio Próprio</div>
  <div style="text-align: center; font-size: 24px"><p>Engenheiros de software deverão praticar um aprendizado vitalício acerca 
  da prática de sua profissão e deverão promover uma abordagem ética no que tange à ela.</p></div>`,
];

// Interação com os clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Popup
const popUp = document.createElement("div");
popUp.style.display = "none";
popUp.style.position = "fixed";
popUp.style.top = "50%";
popUp.style.left = "50%";
popUp.style.transform = "translate(-50%, -50%)";
popUp.style.width = "75%";
popUp.style.padding = "20px";
popUp.style.backgroundColor = "white";
popUp.style.color = "black";
popUp.style.zIndex = "1";
document.body.appendChild(popUp);

function showPopup(monitorIndex) {
  popUp.innerHTML = monitorContents[monitorIndex];
  popUp.style.display = "block";
  document.body.style.pointerEvents = "none";
}

function closePopup() {
  popUp.style.display = "none";
  document.body.style.pointerEvents = "auto";
}

window.addEventListener('click', onClick);

document.addEventListener('click', (event) => {
  if (event.target !== popUp) {
    closePopup();
  }
});

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(monitors);

  if (intersects.length > 0) {
    const monitorIndex = monitors.indexOf(intersects[0].object);
    if (monitorContents[monitorIndex]) {
      showPopup(monitorIndex);
    }
  }
}

// Animação
const animate = () => {
  requestAnimationFrame(animate);

  models.forEach((model) => {
    model.rotation.y += 0.005;
  });

  renderer.render(scene, camera);
};

animate();