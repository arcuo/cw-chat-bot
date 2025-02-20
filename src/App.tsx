import "./App.css";
import { TypeWriter } from "./components/typewriter";
import WebFont from "webfontloader";
import * as m from "motion/react-client";
import { Textarea } from "./components/textarea";

WebFont.load({
	google: {
		families: ["Roboto Condensed:100,200,300,400,500,600,700,800,900"], // TODO: remove unneeded weights
	},
});

function App() {
	return (
		<div className="w-fit h-full text-2xl flex flex-col justify-center mx-[30%] gap-2">
			<m.div
				className="text-[1.2rem]"
				initial={{ opacity: 0, x: -100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
			>
				Introduction
			</m.div>
			<hr className="w-40 border-neutral-700 opacity-20" />
			<TypeWriter
				sentences={[
					"Hey there!",
					"Welcome to my resume!",
					"I'm a developer, which means that I've gone a little overboard and made a chat bot...",
					"Hopefully, you'll find it entertaining and informative as to who I am and what I do.",
					"Feel free to ask me anything about me, my work, or anything else you'd like to know!",
				]}
			/>
			<div className="opacity-40 text-[.9rem]">Press spacebar</div>

			{/* <Textarea className="w-[100%]" /> */}
		</div>
	);
}

export default App;
