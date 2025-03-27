"use client";

import { Main } from "@/components/views/main";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

const Box = (props: ThreeElements["mesh"]) => {
	// This reference will give us direct access to the mesh
	const meshRef = useRef<Mesh>(null);

	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => {
		if (!meshRef.current) return;
		meshRef.current.rotation.x += delta;
	});

	// Return view, these are regular three.js elements expressed in JSX
	return (
		<mesh {...props} ref={meshRef}>
			<boxGeometry args={[1, 1, 1]} />
			<meshBasicMaterial color={"blue"} />
		</mesh>
	);
};

export default function Test() {
	return (
		<Main className="flex h-full items-center justify-center">
			<Canvas>
				<group>
					<Box position={[-1.2, 0, 0]} />
					<Box position={[1.2, 0, 0]} />
				</group>
			</Canvas>
		</Main>
	);
}
