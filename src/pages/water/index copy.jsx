import * as THREE from 'three';
import { createElement, useRef, useEffect } from 'react';
import { World } from '@/utils/three.utils';
import { MathUtils } from 'three';

import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js';
import vertexShader from './shader/vertex.glsl?raw';
import heightFragment from './shader/heightFragment.glsl?raw';
import fragmentShader from './shader/fragment.glsl?raw';

import { SimplexNoise } from 'three/addons/math/SimplexNoise.js';
export default function(){
	const canvasRef = useRef(null);  
	useEffect(() => {
		const canvas=canvasRef.current
	  if (canvas) {  
		
		const simplex = new SimplexNoise();
		function fillTexture( texture ) {

			const waterMaxHeight =120;

			function noise( x, y ) {

				let multR = waterMaxHeight;
				let mult = 0.025;
				let r = 0;
				for ( let i = 0; i < 15; i ++ ) {

					r += multR * simplex.noise( x * mult, y * mult );
					multR *= 0.53 + 0.025 * i;
					mult *= 1.25;

				}

				return r;

			}

			const pixels = texture.image.data;

			let p = 0;
			for ( let j = 0; j < WIDTH; j ++ ) {

				for ( let i = 0; i < WIDTH; i ++ ) {

					const x = i * 128 / WIDTH;
					const y = j * 128 / WIDTH;

					pixels[ p + 0 ] = noise( x, y );
					pixels[ p + 1 ] = pixels[ p + 0 ];
					pixels[ p + 2 ] = 0;
					pixels[ p + 3 ] = 1;

					p += 4;

				}

			}

		}

			const WIDTH=128.*10
			const BOUNDS=512.
			const world=new World(canvas)
			world.init()
			world.update()
			world.updateSize()
			world.addOrbitControls()

			const {scene,camera,renderer}=world
			camera.position.set(200,200,1)
			const sun = new THREE.DirectionalLight( 0xFFFFFF, 10.0 );
			sun.position.set( 200,200,1 );
			const helper = new THREE.DirectionalLightHelper( sun, 5 );
			scene.add( helper );
			world.createModel(sun)
			const sun2 = new THREE.DirectionalLight( 0xFFFFFF, 2.0 );
			sun2.position.set( - 100, 350, - 200 );
			// world.createModel(sun2)

			const material=new THREE.ShaderMaterial( {
				uniforms: THREE.UniformsUtils.merge( [
					THREE.ShaderLib[ 'phong' ].uniforms,
					{
						time: { value: 0.0 },
						resolution: { value: new THREE.Vector2() },
						waveAmplitude: { value: 0.05 },
						waveFrequency: { value: 10.20 },
						shininess: { value: Math.max(50, 1e-4) },
						opacity: { value: 1.0 },
						heightmap: { value: null }
					}
				]),
				vertexShader:vertexShader,
				fragmentShader:THREE.ShaderChunk[ 'meshphong_frag' ],
				// fragmentShader,
				side: THREE.DoubleSide
			} )
			material.lights=true
			window.t=THREE.ShaderChunk
			material.uniforms[ 'diffuse' ].value = new THREE.Color( 0xff9800 );
			material.uniforms[ 'specular' ].value = new THREE.Color( 0x000000 );
			material.uniforms[ 'shininess' ].value = Math.max( 50, 1e-4 );
			material.uniforms[ 'opacity' ].value = 1.;
		
			// Defines
			material.defines.WIDTH = WIDTH.toFixed( 1 );
			material.defines.BOUNDS = BOUNDS.toFixed( 1 );
			
			const gpuCompute = new GPUComputationRenderer( WIDTH, WIDTH, renderer);
			const heightmap0 = gpuCompute.createTexture();

			fillTexture(heightmap0);
			const heightmapVariable = gpuCompute.addVariable('heightmap', heightFragment, heightmap0 );//画高度
			gpuCompute.setVariableDependencies(heightmapVariable, [ heightmapVariable ]);

			heightmapVariable.material.uniforms[ 'mousePos' ] = { value: new THREE.Vector2( 0, 0 ) };
			heightmapVariable.material.uniforms[ 'mouseSize' ] = { value: 2.0 };
			heightmapVariable.material.uniforms[ 'viscosityConstant' ] = { value: .98 };
			heightmapVariable.material.uniforms[ 'heightCompensation' ] = { value: 0 };
			heightmapVariable.material.uniforms[ 'time' ] = { value: 0.01 };
			
			heightmapVariable.material.uniforms.waveAmplitude= { value: 0.05 },
			heightmapVariable.material.uniforms.waveFrequency= { value: 10.20 },
			heightmapVariable.material.defines.BOUNDS = BOUNDS.toFixed( 1 );
			const error = gpuCompute.init();
			if ( error !== null ) {

				console.error( error );

			}



			const clock=new THREE.Clock()
			world.addAction(()=>{
				const delta = clock.getDelta();
				material.uniforms.time.value+= delta
				gpuCompute.compute();

				material.uniforms.time.value+= delta
				heightmapVariable.material.uniforms[ 'time' ].value+= delta
				material.uniforms[ 'heightmap' ].value = gpuCompute.getCurrentRenderTarget( heightmapVariable ).texture;
			})
			const plane=new THREE.Mesh(new THREE.PlaneGeometry(BOUNDS, BOUNDS, WIDTH - 1, WIDTH - 1),material)
			camera.lookAt(0,0,0)
			// plane.rotateX(MathUtils.degToRad(-90))

			plane.rotation.x = - Math.PI / 2;
			plane.matrixAutoUpdate = true;
			plane.updateMatrix();
			world.createModel(plane)
			// {
				
			// 	const plane=new THREE.Mesh(new THREE.PlaneGeometry(1,1,100,100),new THREE.MeshPhongMaterial({color:0xffffff,side:THREE.DoubleSide}))
			// 	camera.lookAt(0,0,0)
			// 	plane.position.y=0.2
			// 	plane.rotateX(MathUtils.degToRad(-90))
			// 	world.createModel(plane)
			// }
	  }
	}, []);

	return <>
	    <canvas style={{display:"block",width:"100vw",height:"100vh"}} ref={canvasRef} />  
	</>
}