import { loadAnimDict } from '@/utils/shared';

export async function TaskAnim(animDictionary: string, animName: string, flag: number, blendInSpeed: number) {
    ClearPedTasks(PlayerPedId());
    const dict = await loadAnimDict(animDictionary);
    if (!dict) return;

    TaskPlayAnim(PlayerPedId(), animDictionary, animName, blendInSpeed + 0.0, 2.0, -1, flag, 0, false, false, false);

    dict.clean();
}

export async function TaskAnimTimed(
    animDictionary: string,
    animName: string,
    flag: number,
    blendInSpeed: number,
    time: number,
) {
    if (LocalPlayer.state.dead) return;
    ClearPedSecondaryTask(PlayerPedId());
    const dict = await loadAnimDict(animDictionary);
    if (!dict) return;

    TaskPlayAnim(PlayerPedId(), animDictionary, animName, blendInSpeed + 0.0, 2.0, time, flag, 0, false, false, false);

    dict.clean();
}