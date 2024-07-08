import * as THREE from 'three';
import { createElement, useRef, useEffect } from 'react';
import { World } from '@/utils/three.utils';
import System, { 
	BoxZone,
	Color,
	CrossZone,
	CustomRenderer,
	Debug,
	Emitter,
	Gravity,
	Life,
	Mass,
	RadialVelocity,
	Radius,
	Rate,
	Rotate,
	Scale,
	Span,
	Vector3D,
	Position,
	ease,} from 'three-nebula';
window.a=System
const createZone = () => {
	const zone = new BoxZone(600);
  
	zone.friction = 0.1;
	zone.max = 7;
  
	return zone;
  };
  const minX = -10;  
const minY = -10;  
const maxX = 10;  
const maxY = 10;  
  
// 初始化器函数，用于在指定区域内随机设置粒子位置  
function initParticlePosition(particle) {  
    particle.position.x = Math.random() * (maxX - minX) + minX;  
    particle.position.y = Math.random() * (maxY - minY) + minY;  
    particle.position.z = 0; // 假设粒子在Z轴上的位置是固定的  
}  
  
const position = new Position();

position.addZone(new BoxZone(500, 1100, 500));
const createEmitter = zone => {
	const emitter = new Emitter();
  
	emitter
	  .setRate(new Rate(new Span(1,50), new Span(0.2,0.5)))
	  .addInitializers([
		new Mass(1),
		new Radius(1),
		position,
		new Life(5, 10),
		new RadialVelocity(400, new Vector3D(0, -1, 0), 0),
	  ])
	  .addBehaviours([
		new Rotate('random', 'random'),
		new Scale(1, 1),
		new Gravity(6),
		new CrossZone(zone, 'bound'),
		new Color(0xff0000, 'random', Infinity, ease.easeOutQuart),
	  ])
	  .setPosition({ x: 0, y: 0 })
	  .emit();
  
	return emitter;
  };
  
let json = {
	preParticles: 500,
	integrationType: 'euler',
	emitters: [
	  {
		rate: {
		  particlesMin: 5,
		  particlesMax: 7,
		  perSecondMin: 0.01,
		  perSecondMax: 0.02,
		},
		position: {
		  x: 70,
		  y: 0,
		},
		initializers: [
		  {
			type: 'Mass',
			properties: {
			  min: 1,
			  max: 1,
			},
		  },
		  {
			type: 'Life',
			properties: {
			  min: 2,
			  max: 2,
			},
		  },
		  {
			type: 'BodySprite',
			properties: {
			  texture: '/transition2.png',
			},
		  },
		  {
			type: 'Radius',
			properties: {
			  width: 80,
			  height: 80,
			},
		  },
		],
		behaviours: [
		  {
			type: 'Alpha',
			properties: {
			  alphaA: 1,
			  alphaB: 0,
			},
		  },
		  {
			type: 'Color',
			properties: {
			  colorA: '#4F1500',
			  colorB: '#0029FF',
			},
		  },
		  {
			type: 'Scale',
			properties: {
			  scaleA: 1,
			  scaleB: 0.5,
			},
		  },
		  {
			type: 'Force',
			properties: {
			  fx: 0,
			  fy: 0,
			  fz: -20,
			},
		  },
		],
	  },
	  {
		rate: {
		  particlesMin: 5,
		  particlesMax: 7,
		  perSecondMin: 0.01,
		  perSecondMax: 0.02,
		},
		position: {
		  x: -70,
		  y: 0,
		},
		initializers: [
		  {
			type: 'Mass',
			properties: {
			  min: 1,
			  max: 1,
			},
		  },
		  {
			type: 'Life',
			properties: {
			  min: 2,
			  max: 2,
			},
		  },
		  {
			type: 'BodySprite',
			properties: {
			  texture: '/transition2.png',
			},
		  },
		  {
			type: 'Radius',
			properties: {
			  width: 80,
			  height: 80,
			},
		  },
		],
		behaviours: [
		  {
			type: 'Alpha',
			properties: {
			  alphaA: 1,
			  alphaB: 0,
			},
		  },
		  {
			type: 'Color',
			properties: {
			  colorA: '#004CFE',
			  colorB: '#6600FF',
			},
		  },
		  {
			type: 'Scale',
			properties: {
			  scaleA: 1,
			  scaleB: 0.5,
			},
		  },
		  {
			type: 'Force',
			properties: {
			  fx: 0,
			  fy: 0,
			  fz: -20,
			},
		  },
		],
	  },
	],
};
json={
	"preParticles": 100,//开始时粒子数量
	"integrationType": "EULER",//要使用的集成算法类型。
	"emitters": [//粒子系统中的发射器。
	  {
		"id": "51ca9450-3d8b-11e9-a1e8-4785d9606b75",
		"totalEmitTimes": null,//发射器应发射粒子的总次数。
		"life": null,//粒子寿命
		"cache": { "totalEmitTimes": null, "life": null },
		"rate": {//每秒发射的粒子数（a [粒子]/b [秒]）
		  "particlesMin": 1,//要发射的最小粒子数
		  "particlesMax": 4,//要发射的最大粒子数
		  "perSecondMin": 0.01,//最小每秒发射速率
		  "perSecondMax": 0.02//每秒最大发射速率
		},
		"position": { "x": 0, "y": 0, "z": 0 },
		"rotation": { "x": 0, "y": 0, "z": 0 },
		"initializers": [
		  {
			"id": "51ca9451-3d8b-11e9-a1e8-4785d9606b75",
			"type": "Mass",
			"properties": { "min": 1, "max": 1, "isEnabled": true }
		  },
		  {
			"id": "51ca9452-3d8b-11e9-a1e8-4785d9606b75",
			"type": "Life",
			"properties": { "min": 2, "max": 4, "isEnabled": true }
		  },
		  {
			"id": "51ca9453-3d8b-11e9-a1e8-4785d9606b75",
			"type": "BodySprite",
			"properties": {
			  "texture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJkSURBVHjaxJeJbusgEEW94S1L//83X18M2MSuLd2pbqc4wZGqRLrKBsyZhQHny7Jk73xVL8xpVhWrcmiB5lX+6GJ5YgQ2owbAm8oIwH1VgKZUmGcRqKGGPgtEQQAzGR8hQ59fAmhJHSAagigJ4E7GPWRXOYC6owAd1JM6wDQPADyMWUqZRMqmAojHp1Vn6EQQEgUNMJLnUjMyJsM49wygBkAPw9dVFwXRkncCIIW3GRgoTQUZn6HxCMAFEFd8TwEQ78X4rHbILoAUmeT+RFG4UhQ6MiIAE4W/UsYFjuVjAIa2nIY4q1R0GFtQWG3E84lqw2GO2QOoCKBVu0BAPgDSU0eUDjjQenNkV/AW/pWChhpMTelo1a64AOKM30vk18GzTHXCNtI/Knz3DFBgsUqBGIjTInXRY1yA9xkVoqW5tVq3pDR9A0hfF5BSARmVnh7RMDCaIdcNgbPBkgzn1Bu+SfIEFSpSBmkxyrMicb0fAEuCZrWnN89veA/4XcakrPcjBWzkTuLjlbfTQPOlBhz+HwkqqPXmPQDdrQItxE1moGof1S74j/8txk8EHhTQrAE8qlwfqS5yukm1x/rAJ9Jiaa6nyATqD78aUVBhFo8b1V4DdTXdCW+IxA1zB4JhiOhZMEWO1HqnvdoHZ4FAMIhV9REF8FiUm0jsYPEJx/Fm/N8OhH90HI9YRHesWbXXZwAShU8qThe7H8YAuJmw5yOd989uRINKRTJAhoF8jbqrHKfeCYdIISZfSq26bk/K+yO3YvfKrVgiwQBHnwt8ynPB25+M8hceTt/ybPhnryJ78+tLgAEAuCFyiQgQB30AAAAASUVORK5CYII=",
			  "isEnabled": true
			}
		  },
		  {
			"id": "51ca9454-3d8b-11e9-a1e8-4785d9606b75",
			"type": "Radius",
			"properties": { "width": 10,"height": 10, "isEnabled": true }
		  },
		  {
			"id": "51ca9455-3d8b-11e9-a1e8-4785d9606b75",
			"type": "RadialVelocity",
			"properties": {
			  "radius": 10,
			  "x": 0,
			  "y": 5,
			  "z": 0,
			  "theta": 900,
			  "isEnabled": true
			}
		  }
		],
		"behaviours": [
		  {
			"id": "51ca9456-3d8b-11e9-a1e8-4785d9606b75",
			"type": "Alpha",
			"properties": {
			  "alphaA": 1,
			  "alphaB": 0.,
			  "life": null,
			  "easing": "easeLinear"
			}
		  },
		  {
			"id": "51ca9457-3d8b-11e9-a1e8-4785d9606b75",
			"type": "Color",
			"properties": {
			  "colorA": "#002a4f",
			  "colorB": "#0029FF",
			  "life": null,
			  "easing": "easeOutCubic"
			}
		  },
		  {
			"id": "51ca9458-3d8b-11e9-a1e8-4785d9606b75",
			"type": "Scale",
			"properties": {
			  "scaleA": 1,
			  "scaleB": 1,
			  "life": null,
			  "easing": "easeLinear"
			}
		  },
		  {
			"id": "51ca9459-3d8b-11e9-a1e8-4785d9606b75",
			"type": "Force",
			"properties": {
			  "fx": 0,
			  "fy": 5,
			  "fz": 0,
			  "life": null,
			  "easing": "easeLinear"
			}
		  },
		  {
			"id": "51ca945a-3d8b-11e9-a1e8-4785d9606b75",
			"type": "Rotate",
			"properties": {
			  "x": 1,
			  "y": 0,
			  "z": 0,
			  "life": null,
			  "easing": "easeLinear"
			}
		  },
		  {
			"id": "51ca945b-3d8b-11e9-a1e8-4785d9606b75",
			"type": "RandomDrift",
			"properties": {
			  "driftX": 1,
			  "driftY": 23,
			  "driftZ": 4,
			  "delay": 1,
			  "life": null,
			  "easing": "easeLinear"
			}
		  },
		  {
			"id": "51ca945c-3d8b-11e9-a1e8-4785d9606b75",
			"type": "Spring",
			"properties": {
			  "x": 1,
			  "y": 5,
			  "z": 0,
			  "spring": 0.01,
			  "friction": 1,
			  "life": null,
			  "easing": "easeLinear"
			}
		  }
		],
		"emitterBehaviours": []
	  }
	]
  }
  
export default function(){
	const canvasRef = useRef(null);  
	useEffect(() => {
		const canvas=canvasRef.current
	  if (canvas) {  
		
		const world=new World(canvas)
		world.init()
		world.update()
		world.updateSize()
		world.addOrbitControls()

		const {scene,camera,renderer}=world
		camera.position.set(500,100,500)
		const light = new THREE.AmbientLight( 0x404040 ,10); // 柔和的白光
		world.createModel(light)

		camera.lookAt(0,0,0)

		// const box=new THREE.BoxGeometry(1,1,1)
		// const material=new THREE.MeshPhongMaterial({color:0xff0000})
		// const mesh=new THREE.Mesh(box,new THREE.MeshNormalMaterial())
		// world.createModel(mesh)
		function animate(nebula, app) {
			requestAnimationFrame(() => animate(nebula, app));
			nebula.update();
			app.renderer.render(app.scene, app.camera);
		}

		const system = new System();
		const renderer1 = new CustomRenderer();
		const mesh = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshNormalMaterial()
		);
		const zone = createZone();
		const emitter = createEmitter(zone);

		renderer1.onParticleCreated = function(p) {
			p.target = this.targetPool.get(mesh);
			// const x=Math.random()*1000
			// p.position.set(x,p.position.y,x)
			p.target.position.copy(p.position);
			scene.add(p.target);
		};

		renderer1.onParticleUpdate = function(p) {
			const scale = p.scale*1;
			p.target.position.copy(p.position);
			p.target.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z);
			p.target.scale.set(scale, scale, scale);
		};

		renderer1.onParticleDead = function(p) {
			this.targetPool.expire(p.target);
			scene.remove(p.target);

			p.target = null;
		};
		const app =world;
		const nebula=system.addEmitter(emitter).addRenderer(renderer1);
		animate(nebula, app);
		// System.fromJSONAsync(json, THREE).then(system => {
			
		// 	const app =world;
		// 	const nebulaRenderer = new SpriteRenderer(app.scene, THREE);
		// 	const nebula = system.addRenderer(nebulaRenderer);//向系统实例添加渲染器并初始化它。
		// 	nebulaRenderer.onParticleCreated = function(p) {
		// 		p.target = this._targetPool.get(mesh);

		// 		p.target.position.copy(p.position);
		// 		scene.add(p.target);
		// 	};
		// 	nebulaRenderer.onParticleDead = function(p) {
		// 		this.targetPool.expire(p.target);
		// 		scene.remove(p.target);
			
		// 		p.target = null;
		// 	};

		// 	animate(nebula, app);
		// });
		}
	}, []);

	return <>
	    <canvas style={{display:"block",width:"100vw",height:"100vh"}} ref={canvasRef} />  
	</>
}