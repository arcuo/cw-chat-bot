"use client";

import { Canvas } from "@react-three/fiber";
import { Html, Preload, useProgress } from "@react-three/drei";
import tunnel from "tunnel-rat";
import * as THREE from "three";
import type { HTMLAttributes, PropsWithChildren } from "react";

import {
	forwardRef,
	Suspense,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react";
import {
	OrbitControls,
	PerspectiveCamera,
	View as ViewImpl,
} from "@react-three/drei";

export const r3f = tunnel();

export const Three = ({ children }: PropsWithChildren) => {
	return <r3f.In>{children}</r3f.In>;
};

export function Scene({ ...props }) {
	// Everything defined in here will persist between route changes, only children are swapped
	return (
		<Canvas
			{...props}
			onCreated={(state) => {
				state.gl.toneMapping = THREE.AgXToneMapping;
			}}
		>
			{/* @ts-ignore */}
			<r3f.Out />
			<Preload all />
		</Canvas>
	);
}

Scene.displayName = "Scene";

/** Common scene */
export const Common = ({ color }: { color?: THREE.ColorRepresentation }) => (
	<Suspense fallback={null}>
		{color && <color attach="background" args={[color]} />}
		<ambientLight />
		<pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
		<pointLight position={[-10, -10, -10]} color="blue" decay={0.2} />
		<PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
	</Suspense>
);

Common.displayName = "Common";

/** View that enables three js */
export const View = forwardRef<
	HTMLDivElement,
	PropsWithChildren<HTMLAttributes<HTMLDivElement> & { orbit?: boolean }>
>(({ children, orbit, ...props }, ref) => {
	const localRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	useImperativeHandle(ref, () => localRef.current!);

	return (
		<>
			<div ref={localRef} {...props} />
			<Three>
				<ViewImpl track={localRef}>
					{children}
					{orbit && <OrbitControls />}
				</ViewImpl>
			</Three>
		</>
	);
});

View.displayName = "View";

export function Loader() {
	const { progress, loaded } = useProgress();
	console.log('loaded:', loaded)
	useEffect(() => {
		console.log("progress", progress);
	}, [progress]);

	return <Html center>{progress}</Html>;
}
