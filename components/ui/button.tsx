import { cn } from "@/lib/utils";
import { Loader } from "./loader";

export function Button({
	children,
	loading,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
	return (
		<button
			className={cn(
				"hover:-translate-y-0.5 rounded-md border border-neutral-700 bg-transparent px-3 py-1 text-sm transition-transform hover:bg-neutral-700/30 focus:outline-none focus-visible:ring-2 active:bg-neutral-700/40",
				{
					"pointer-events-none opacity-50": props.disabled,
				},
			)}
			type="button"
			{...props}
		>
			{loading ? <Loader className="h-4" /> : children}
		</button>
	);
}
