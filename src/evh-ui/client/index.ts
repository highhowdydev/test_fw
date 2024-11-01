import { SetNUIFocus } from "@/utils/client";
import { Delay } from "@/utils/shared";

let currentApp = "";
let init = false;

const callbacks = new Map<string, () => void>();

export function NuiCallback(event: string, cb: (...args: any) => void) {
	RegisterNuiCallbackType(event);
	on(`__cfx_nui:${event}`, cb);
	callbacks.set(event, cb);
}

export async function SetApplication(application: string, focus: boolean, forceSwitch?: boolean) {}

export function CloseCurrentApplication() {}

export async function SetFocus(hasKeyboard: boolean, hasMouse: boolean, keepInput = false) {}

async function EnsureInit() {}

export async function SendMessageToNui(event: string, data: any) {}

export async function DispatchNuiEvent(action: string, payload = {}) {}

export const GetCurrentApplication = () => currentApp;

// Main UI global exports
global.exports("DispatchNuiEvent", DispatchNuiEvent);
global.exports("NuiCallback", NuiCallback);
global.exports("GetCurrentApplication", GetCurrentApplication);
global.exports("SetApplication", SetApplication);
global.exports("SendMessageToNui", SendMessageToNui);
global.exports("SetFocus", SetFocus);
global.exports("CloseCurrentApplication", CloseCurrentApplication);
