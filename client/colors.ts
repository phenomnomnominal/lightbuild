// Dependencies:
import debounce from 'lodash-es/debounce'
import { setColor } from './bulb';

// Constants:
const HEX_REGEX = /^#([A-Fa-f0-9]{6})$/;
const COLOR_REGEX = /[A-Fa-f0-9]{2}/g;

let changing = false;
let colors: Array<Array<number>> = [];

export function transitionColor (delay: number): (event: Event) => void {
    return debounce((event: Event) => {
        colors.push(hexToRGB((event.target as HTMLInputElement).value));
        if (!changing) {
            changeNextColor();
        }
    }, delay);
}

async function changeNextColor (): Promise<void> {
    if (colors.length) {
        changing = true;
        let [r, g, b] = colors.shift();
        await setColor(r, g, b);
        return changeNextColor();
    } else {
        changing = false;
        return Promise.resolve();
    }
}

function hexToRGB (hex: string): Array<number> {
    if (HEX_REGEX.test(hex)){
        return hex.replace('#', '')
            .match(COLOR_REGEX)
            .map(c => `0x${c}`)
            .map(c => (+c)&255);
    }
    return [0, 0, 0];
}
