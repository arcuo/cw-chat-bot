"use client";

import { Main } from "@/components/views/main";
import { vertexShader, fragmentShader } from "@/lib/shaders/wave";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { useAnimate } from "motion/react";
import { useMemo, useRef, useState } from "react";
import type { Group, Mesh } from "three";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies

const Box = (props: ThreeElements["mesh"]) => {
	// Return view, these are regular three.js elements expressed in JSX
	const [scaled, setScaled] = useState(false);

	// @ts-ignore
	const [scope, animate] = useAnimate<Mesh>();

	return (
		<mesh
			{...props}
			ref={scope}
			onClick={() => {
				setScaled(!scaled);
				animate(
					scope.current?.scale,
					{
						x: scaled ? 1 : 2,
						y: scaled ? 1 : 2,
						z: scaled ? 1 : 2,
					},
					{
						// type: "spring",
						// duration: 0.2,
					},
				);
			}}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={"blue"} />
		</mesh>
	);
};

const getDefaultUniforms = () => {
	return {
		u_time: { value: 0.0 },
		u_mouse: {
			value: {
				x: 0.0,
				y: 0.0,
			},
		},
		u_resolution: {
			value: {
				x: window.innerWidth * window.devicePixelRatio,
				y: window.innerHeight * window.devicePixelRatio,
			},
		},
	};
};
const Experience = () => {
	// This reference will give us direct access to the mesh
	const groupRef = useRef<Group>(null);
	const shaderRef = useRef<ThreeElements["shaderMaterial"]>(null);

	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => {
		if (!shaderRef.current?.uniforms) return;
		shaderRef.current.uniforms.u_time.value = state.clock.elapsedTime;
	});

	const uniforms = useMemo(() => {
		const uniforms = {
			...getDefaultUniforms(),
			u_pointsize: { value: 2.0 },
			// wave 1
			u_noise_freq_1: { value: 3.0 },
			u_noise_amp_1: { value: 0.2 },
			u_spd_modifier_1: { value: 1.0 },
			// wave 2
			u_noise_freq_2: { value: 2.0 },
			u_noise_amp_2: { value: 0.3 },
			u_spd_modifier_2: { value: 0.8 },
		};
		return uniforms;
	}, []);

	return (
		<>
			<directionalLight position={[10, 10, 10]} />
			<group ref={groupRef}>
				<points>
					<planeGeometry args={[4, 4, 128, 128]} />
					<shaderMaterial
						ref={shaderRef}
						uniforms={uniforms}
						vertexShader={vertexShader}
						fragmentShader={fragmentShader}
					/>
				</points>
			</group>
		</>
	);
};

export default function Test() {
	return (
		<Main className="flex h-full items-center justify-center">
			<Canvas
			// dpr={[1, 2]}
			// // flat
			// gl={{
			// 	antialias: true,

			// 	toneMapping: CineonToneMapping,
			// }}
			// camera={{
			// 	fov: 45,
			// 	near: 0.1,
			// 	far: 200,
			// 	position: [3, 2, 6],
			// }}
			>
				<OrbitControls />
				<Experience />
			</Canvas>
		</Main>
	);
}
