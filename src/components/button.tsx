export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className="hover:-translate-y-0.5 rounded-md border border-neutral-700 bg-transparent px-4 py-2 text-sm transition-transform hover:bg-neutral-700/30 focus:outline-none focus-visible:ring-2 active:bg-neutral-700/40"
			type="button"
			{...props}
		/>
	);
}
