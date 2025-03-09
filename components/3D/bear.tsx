import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useMemo, type ComponentProps } from "react";

export function Bear(props: Omit<ComponentProps<"primitive">, "scene">) {
	const { scene, materials } = useLoader(GLTFLoader, "/model_bear.gltf");

	useMemo(() => {
		for (const key in materials) {
			materials[key].transparent = true;
			materials[key].opacity = 0;
		}
	}, [materials]);

	useFrame(() => {
		for (const key in materials) {
			if (materials[key].opacity < 1) {
				materials[key].opacity += 0.05;
			}
		}
	});

	return <primitive object={scene} {...props} />;
}
