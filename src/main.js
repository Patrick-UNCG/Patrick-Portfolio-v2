import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Setup
var preloader = document.getElementById('preloader');
window.addEventListener('load', function () {
    preloader.style.display= "none";
  })

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'), alpha: true
});
renderer.setClearColor(0x000000, 0);
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
        // you must pass false here or three.js sadly fights the browser
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // update any render target sizes here
    }
}

renderer.setPixelRatio(window.devicePixelRatio);

renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(pointLight, ambientLight);
const loader = new GLTFLoader();
let model;
camera.position.setY(5)

loader.load(
    // resource URL
    '/scene.gltf',
    // called when the resource is loaded
    function (gltf) {
        model = gltf.scene;
        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
        model.position.setX(0);
        model.position.setZ(-14);
        model.position.setY(1);
        model.scale.multiplyScalar(.015);
        animate();
    },
    // called while loading is progressing
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

        console.log('An error happened');

    }
);
var angle = 0;
var radius = 500;

function animate() {
    requestAnimationFrame(animate);
    resizeCanvasToDisplaySize();

    model.rotateY(Math.PI / 552)


    // controls.update();

    renderer.render(scene, camera);
}

const holder = document.getElementsByClassName("navbar-text");
var active = 0;

function activate() {
    for (let x = 0; x < holder.length; x++) {
        if (x == active) {
            holder[x].classList.add("text-accent-1");
        } else {
            holder[x].classList.remove("text-accent-1");
        }
    }
}

for (let x = 0; x < holder.length; x++) {
    holder[x].addEventListener("click", () => {
        active = x;
        activate();
    })
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const hiddenElements = document.querySelectorAll('.hiddenn');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener('scroll', () => {
    const header = document.querySelector('#navbar');
    if (window.scrollY > 0) {
        header.classList.add('nav');
    }
    else {
        header.classList.remove('nav')
    }
})
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}
$(window).scroll(function () {
    $(".top").css("opacity", 1 - $(window).scrollTop() / 450);
});



$(function () {                       //run when the DOM is ready
    $(".dropdownBtn").click(function () {  //use a class, since your ID gets mangled
        $(".dropdown").toggleClass("showDrop")    //add the class to the clicked element
    });
});

$(function (){
    $('.dropdown-item').click(function (){
        $('.dropdown').toggleClass("showDrop")
    })
})

$('html').click(function (e) {
    if (!$(e.target).hasClass('dropdownBtn')) {
        $('.dropdown').removeClass("showDrop")
        console.log('clicked')
    }
}); 

var toggle = document.getElementById("theme-button");
var myImg = document.getElementById("hero");
var storedBg = localStorage.getItem('background');
var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme){
    document.documentElement.setAttribute('data-theme', storedTheme)
    
}

if(storedBg){
    myImg.src=JSON.parse(storedBg);
}

// Take action when the image has loaded

toggle.onclick = function() {
    window.location.reload();
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "dark";
    

    if (currentTheme === "dark") {
        targetTheme = "light";
        myImg.src = "/herobg2.jpg"
    }
    else{
        myImg.src="/herobg.jpg"
    }

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
    localStorage.setItem('background', JSON.stringify(myImg.src));
    
};


