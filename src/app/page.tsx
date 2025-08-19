"use client";

import * as THREE from "three";
import * as dat from "dat.gui";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default function Home() {
  useEffect(() => {
    // Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Axes helper
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    // Cube
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);

    const planeGeometry = new THREE.PlaneGeometry(30, 30);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true;

    const gridHelper = new THREE.GridHelper(30);
    scene.add(gridHelper);

    const sphereGeometry = new THREE.SphereGeometry();
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x0000ff,
      wireframe: false,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphere.position.set(-5, 3, 0);
    sphere.castShadow = true;

    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    scene.add(directionalLight);
    directionalLight.position.set(-30, 50, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.bottom = -12;

    const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
    scene.add(dLightHelper);

    const dLightShadowHelper = new THREE.CameraHelper(
      directionalLight.shadow.camera
    );
    scene.add(dLightShadowHelper);

    const gui = new dat.GUI();

    const options = {
      sphereColor: "#ffea00",
      wireframe: false,
      speed: 0.01,
    };

    gui
      .addColor(options, "sphereColor")
      .onChange(function (e: THREE.ColorRepresentation) {
        sphere.material.color.set(e);
      });

    gui.add(options, "wireframe").onChange(function (e) {
      sphere.material.wireframe = e;
    });

    gui.add(options, "speed", 0, 0.1);

    camera.position.set(-10, 30, 30);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();

    let step = 0;

    // Animate
    function animate() {
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      step += options.speed;
      sphere.position.y = 10 * Math.abs(Math.sin(step));

      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    // Cleanup on unmount
    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <div></div>;
}
