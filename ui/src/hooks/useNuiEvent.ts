import { MutableRefObject, useEffect, useRef } from 'react';
import { noop } from '../utils';

interface NuiMessageData<T = unknown> {
    action: string;
    data: T;
    event: string;
}

type NuiHandlerSignature<T> = (data: T) => void;

/**
 * A hook that manage events listeners for receiving data from the client scripts
 * @param action The specific `action` that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 *
 * @example
 * useNuiEvent<{visibility: true, wasVisible: 'something'}>('setVisible', (data) => {
 *   // whatever logic you want
 * })
 *
 **/

export const useNuiEvent = <T = any>(action: string, handler: (data: T) => void) => {
    const savedHandler: MutableRefObject<NuiHandlerSignature<T>> = useRef(noop);

    // Make sure we handle for a reactive handler
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const eventListener = (ev: MessageEvent<NuiMessageData<T>>) => {
            const { action: eventAction, data, event } = ev.data;

            if (savedHandler.current) {
                if (event === action) {
                    savedHandler.current(data);
                }
            }
        };

        window.addEventListener('message', eventListener);

        // Remove Event Listener on component cleanup
        return () => window.removeEventListener('message', eventListener);
    }, [action]);
};