import { cloneElement, useEffect } from "react";
import FullscreenApp from "./components/fullscreen-app";
import { fetchNui, isEnvBrowser } from "./utils";
import { useNuiEvent } from "./hooks/useNuiEvent";
import getAppComponent from "./components/app-component";
import { cn } from "./utils/styling";

export default function App() {
	useNuiEvent("payload", data => {
		// TODO:
		console.log(data);
	});

	useEffect(() => {
		fetchNui("initializeUI");
	}, []);

	const appComponent = getAppComponent("test");

	return (
		<FullscreenApp className={cn(isEnvBrowser() && "bg-gray-800", "text-white")}>
			<h1>Hello</h1>
		</FullscreenApp>
	);

	return (
		<FullscreenApp>
			{appComponent
				? cloneElement(appComponent, { key: (appComponent as any).key || (appComponent as any).type })
				: null}
		</FullscreenApp>
	);
}
