/**
 * Created by Pich on 2017/3/16.
 */
$(function () {
    // THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
    $Tween = function () {
        var scene;
        var camera;
        var stats;
        var renderer;
        var light;
        var model;
        var controls;
        var tween;
        var resize;
        var floor;

        function initScene() {
            scene = new THREE.Scene();
        }

        function initCamera() {
            camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
            camera.position.x = 80;
            camera.position.y = 120;
            camera.position.z = 120;
            camera.up.x = 0;
            camera.up.y = 0;
            camera.up.z = 1;
            camera.lookAt({
                x: 0,
                y: 0,
                z: 0
            });
        }

        function initStats() {
            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';
            document.getElementById('Tween').appendChild(stats.domElement);
        }

        function initRenderer() {
            width = document.getElementById('Tween').clientWidth;
            height = document.getElementById('Tween').clientHeight;
            if (Detector.webgl) {
                renderer = new THREE.WebGLRenderer({
                    antialias: true
                });
            } else {
                renderer = new THREE.CanvasRenderer();
            }
            renderer.setSize(width, height);
            document.getElementById('Tween').appendChild(renderer.domElement);
            renderer.setClearColor(0xFFFFFF, 1.0);
            renderer.shadowMap.enabled = true;
        }

        function initLight() {
            light = new THREE.SpotLight(0xffffff, 2, 1000, Math.PI / 6, 25);
            light.position.set(0, 500, 100);
            light.castShadow = true;
            scene.add(light);
        }

        function initObject() {

            // FLOOR
            var floorTexture = new THREE.ImageUtils.loadTexture('./img/checkerboard.jpg');
            floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
            floorTexture.repeat.set(10, 10);
            var floorMaterial = new THREE.MeshLambertMaterial({
                map: floorTexture,
                side: THREE.DoubleSide
            });
            var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
            floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.receiveShadow = true;
            scene.add(floor);


            var loader = new THREE.OBJLoader();
            loader.load('./img/me.obj', function (obj) {
                obj.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = new THREE.MeshLambertMaterial({
                            color: 0xffff00,
                            side: THREE.DoubleSide
                        });
                        child.castShadow = true;
                    }
                });
                model = obj;
                console.log(model);
                scene.add(obj);
            });
        }

        function initTween() {
            tween = TweenMax.to(light.position, 5, {
                y: '-500',
                repeat: -1,
                yoyo: true,
                ease: Linear.easeNone
            });
            tween = TweenMax.to(camera.position, 5, {
                y: '-100',
                repeat: -1,
                yoyo: true,
                ease: Linear.easeNone
            });
            tween = TweenMax.to(floor.rotation, 50, {
                z: '-45',
                repeat: -1,
                yoyo: true,
                ease: Linear.easeNone
            });

        }

        function initControls() {

            if (document.getElementById('Tween').clientWidth / document.getElementById('Tween').clientHeight < 1) {
                controls = new THREE.DeviceOrientationControls(light);
            } else {
                controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.target = new THREE.Vector3(0, 0, 0);
            }
        }

        function initResize() {
            resize = function (renderer, camera) {
                var callback = function () {
                    width = document.getElementById('Tween').clientWidth;
                    height = document.getElementById('Tween').clientHeight;

                    renderer.setSize(width, height);
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                };
                window.addEventListener('resize', callback, false);
                return {
                    stop: function () {
                        window.removeEventListener('resize', callback);
                    }
                };
            };
            resize(renderer, camera);
        }

        function initAnimation() {
            renderer.render(scene, camera);
            stats.update();
            controls.update();
            requestAnimationFrame(initAnimation);
        }
        // 准备就绪
        function threeStart() {
            initRenderer();
            initCamera();
            initScene();
            initLight();
            initObject();
            window.show3d();
            initControls();
            initStats();
            initAnimation();
            initTween();
            initResize();
        }
        threeStart();
    };
    window.show3d = function(){
        $(".loading").fadeOut("slow");
    }
    $Tween();

});