import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let camera, scene, renderer;
const backgroundColor = 0x8f949c;
class App {
  init(url, element) {
    const container = document.getElementById(element);
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(80, aspect, 0.1, 800);
    camera.position.set(1, 1, 5);

    scene = new THREE.Scene();

    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial();

    // const mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(backgroundColor);

    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    renderer.render(scene, camera);

    window.addEventListener("resize", onWindowResize, false);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 0.9;

    controls.minDistance = 3;
    controls.maxDistance = 5;

    controls.minPolarAngle = 0; // radians
    controls.maxPolarAngle = Math.PI / 2; // radians

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    ///////////////////Lightning//////////////////
    const hemiLight = new THREE.HemisphereLight(0x20202a, 0x080820, 4);
    hemiLight.position.set(30, -10, 30);
    scene.add(hemiLight);

    var spotlight = new THREE.SpotLight(0xffa95c, 2);

    scene.add(spotlight);
    // //////////////////////////////////////  ///////////////
    var loader = new GLTFLoader();
    loader.crossOrigin = true;

    // const url = "../src/SweartL.glb";

    const renderModel = (url) => {
      loader.load(url, function (data) {
        var object = data.scene;
        object.position.set(0, -2.33, -0.75);
        object.scale.set(8, 8, 8);
        scene.add(object);
        animate();
      });
    };
    function animate() {
      renderer.render(scene, camera);
      spotlight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10
      );
      requestAnimationFrame(animate);
    }
    renderModel(url);
    animate();
    function onWindowResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(container.clientWidth, container.clientHeight);
    }
  }
}

export default App;
