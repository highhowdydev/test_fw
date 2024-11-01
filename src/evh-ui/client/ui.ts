import { SetNUIFocus } from "@/utils/client";
import { Delay } from "@/utils/shared";

let currentApp = "";
let init = false;

const callbacks = new Map<string, () => void>();

on("dispatchNuiEvent", (event: string, args = {}) => DispatchNuiEvent(event, args));

export function NuiCallback(event: string, cb: (...args: any) => void) {
	RegisterNuiCallbackType(event);
	on(`__cfx_nui:${event}`, cb);
	callbacks.set(event, cb);
}

NuiCallback("onCloseNuiApplication", (_: any, cb: (...args: any) => void) => {
	SetNUIFocus(false, false);
	currentApp = "";
	cb(1);
});

NuiCallback("UI", (_: any, cb: (...args: any) => void) => {
	init = true;
});

export async function SetApplication(application: string, focus: boolean, forceSwitch?: boolean) {
	let previousApp = currentApp;
	if (focus && (IsNuiFocused() || (IsNuiFocusKeepingInput() && !forceSwitch))) return previousApp;

	await EnsureInit();

	DispatchNuiEvent("setNuiApplication", {
		application,
	});

	currentApp = application;
	if (focus) SetNUIFocus(true, true);

	return previousApp;
}

async function EnsureInit() {
	if (init) return;

	do {
		await Delay(500);
	} while (!init);
}

export async function DispatchNuiEvent(action: string, payload = {}) {
	await EnsureInit();

	SendNUIMessage({
		event: "payload",
		action,
		data: {
			action,
			...payload,
		},
	});
}

export const GetCurrentApplication = () => currentApp;
