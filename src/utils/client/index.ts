export * from "./ui";
export * from "./tasks";
export * from "./blip";
export * from "./player";

export const DrawText2D = (
	x: number,
	y: number,
	width: number,
	height: number,
	scale: number,
	font: number,
	color: any,
	text: string,
) => {
	SetTextFont(font);
	SetTextProportional(false);
	SetTextScale(scale, scale);
	SetTextColour(color[0], color[1], color[2], color[3]);
	SetTextEdge(2, 0, 0, 0, 255);
	SetTextDropShadow();
	SetTextOutline();
	SetTextEntry("STRING");
	AddTextComponentString(text);
	DrawText(x - width / 2, y - height / 2 + 0.005);
};
