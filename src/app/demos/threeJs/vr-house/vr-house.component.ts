import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-vr-house',
  templateUrl: './vr-house.component.html',
  styleUrls: ['./vr-house.component.scss'],
})
export class VrHouseComponent implements AfterViewInit {
  hotPoints = [
    {
      position: {
        x: 0,
        y: 0,
        z: -0.2,
      },
      detail: {
        title: '信息点1',
      },
    },
    {
      position: {
        x: -0.2,
        y: -0.05,
        z: 0.2,
      },
      detail: {
        title: '信息点2',
      },
    },
  ];
  scene: any;
  poiObj: any = [];
  camera: any;
  ngAfterViewInit(): void {
    this.addListener();

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      90,
      document.body.clientWidth / document.body.clientHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 0.01);

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(document.body.clientWidth, document.body.clientHeight);

    document.getElementById('container').appendChild(renderer.domElement);
    //镜头控制器
    const controls = new OrbitControls(this.camera, renderer.domElement);
    let materials = [];
    //根据左右上下前后的顺序构建六个面的材质集
    const texture_left = new THREE.TextureLoader().load(
      'assets/images/scene_left.jpeg'
    );
    materials.push(new THREE.MeshBasicMaterial({ map: texture_left }));

    const texture_right = new THREE.TextureLoader().load(
      'assets/images/scene_right.jpeg'
    );
    materials.push(new THREE.MeshBasicMaterial({ map: texture_right }));

    const texture_top = new THREE.TextureLoader().load(
      'assets/images/scene_top.jpeg'
    );
    materials.push(new THREE.MeshBasicMaterial({ map: texture_top }));

    const texture_bottom = new THREE.TextureLoader().load(
      'assets/images/scene_bottom.jpeg'
    );
    materials.push(new THREE.MeshBasicMaterial({ map: texture_bottom }));

    const texture_front = new THREE.TextureLoader().load(
      'assets/images/scene_front.jpeg'
    );
    materials.push(new THREE.MeshBasicMaterial({ map: texture_front }));

    const texture_back = new THREE.TextureLoader().load(
      'assets/images/scene_back.jpeg'
    );
    materials.push(new THREE.MeshBasicMaterial({ map: texture_back }));

    const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials);
    box.geometry.scale(1, 1, -1);
    this.scene.add(box);
    this.addHotPoint();

    const loop = () => {
      requestAnimationFrame(loop);
      // // box.rotation.x += 0.01;
      // box.rotation.y += 0.001;
      renderer.render(this.scene, this.camera);
    };

    loop();
    // renderer.render(this.scene, this.camera);
  }

  addListener() {
    document
      .querySelector('#container')
      .addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();

        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        mouse.x = (event.clientX / document.body.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / document.body.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, this.camera);

        var intersects = raycaster.intersectObjects(this.poiObj);
        if (intersects.length > 0) {
          debugger;
          alert('点击了热点' + intersects[0].object.detail.title);
        }
      });
  }

  addHotPoint() {
    const pointTexture = new THREE.TextureLoader().load(
      'assets/images/hot.png'
    );
    const material = new THREE.SpriteMaterial({ map: pointTexture });
    for (let i = 0; i < this.hotPoints.length; i++) {
      const x = this.hotPoints[i];
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(0.1, 0.1, 0.1);
      sprite.position.set(x.position.x, x.position.y, x.position.z);
      sprite.detail = x.detail;
      this.poiObj.push(sprite);
      this.scene.add(sprite);
    }
  }
}
