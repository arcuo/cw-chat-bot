"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import NextImage from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

const Root = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
			className,
		)}
		{...props}
	/>
));
Root.displayName = AvatarPrimitive.Root.displayName;

const Image = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Image>,
	Omit<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>, "src"> & {
		src: string;
	}
>(({ className, src, alt, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn("aspect-square h-full w-full", className)}
		{...props}
	>
		<NextImage src={src} alt={alt ?? ""} fill unoptimized />
	</AvatarPrimitive.Image>
));
Image.displayName = AvatarPrimitive.Image.displayName;

const Fallback = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Fallback>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			"flex h-full w-full items-center justify-center rounded-[inherit] bg-secondary text-xs",
			className,
		)}
		{...props}
	/>
));
Fallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Root, Fallback, Image };
