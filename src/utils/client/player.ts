import Vector3 from "@/utils/shared/math/vector3";

export function GetPlayerPosition() {
	const ped = PlayerPedId();
	const [x, y, z] = GetEntityCoords(ped, true);
	return new Vector3(x, y, z);
}
