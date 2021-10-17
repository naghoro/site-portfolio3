import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class SingletonRenderer {
    static instance;

    static getInstance(scene, camera, canvas, width, height) {
        let first = false

        if (canvas.id == "" || !SingletonRenderer.instance) {
            if (SingletonRenderer.instance) {
                // 情報を引き継ぐ
                const models = SingletonRenderer.instance.models
                SingletonRenderer.removeInstance()
                SingletonRenderer.instance = new SingletonRenderer(scene, camera, canvas, width, height, models);
            }
            else {
                SingletonRenderer.instance = new SingletonRenderer(scene, camera, canvas, width, height, {});

                SingletonRenderer.instance.setModel(scene, camera, 'vr', '/xr-portfolio/model/vrplanet.glb', 0)
                SingletonRenderer.instance.setModel(scene, camera, 'ar', '/xr-portfolio/model/arplanet.glb', 240)
                SingletonRenderer.instance.setModel(scene, camera, 'web', '/xr-portfolio/model/webplanet.glb', 120)
                first = true
            }

            canvas.id = "threejs"
        }

        return [SingletonRenderer.instance, first];
    }

    static removeInstance() {
        delete SingletonRenderer.instance.renderer;
        delete SingletonRenderer.instance;
        SingletonRenderer.instance = null;
    }

    constructor(scene, camera, canvas, width, height, models) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true })

        renderer.setSize(width, height);

        this.renderer = renderer
        this.secne = scene;
        this.models = models;
        this.camera = camera;
    }

    setModel(scene, camera, name, modelpath, degree) {
        const thisobj = this;
    
        const loader = new GLTFLoader();
        loader.load(modelpath, function ( gltf ) {
                const model = gltf.scene;
                model.scale.set(1.0, 1.0, 1.0);
                scene.add( model );
                thisobj.models[name] = {
                    model: model,
                    degree: 0
                }
                thisobj.updateModelPos(name, degree)
    
                thisobj.renderer.render( scene, camera );

            } , undefined, function ( error ) {
                console.error( error );
            }
        );
    }

    // 更新したい角度
    updateModelPos(key, d) {
        if(this.models[key] != undefined) {
            const model = this.models[key]["model"]
            let degree = this.models[key]["degree"]

            degree += d
            if (degree > 360) {
                degree = 0
            }

            const radius = 5
            const z = radius * Math.cos(degree / 180 * Math.PI)
            const x = radius * Math.sin(degree / 180 * Math.PI * -1)
            const y = Math.sin(degree / 180 * Math.PI)

            model.position.set(x, y, z);
            this.models[key]["degree"] = degree
        }
    }

    updateModelsPos(degree) {
        Object.keys(this.models).forEach((key) => {
            this.updateModelPos(key, degree)
        })
    }
}