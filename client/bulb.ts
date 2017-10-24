// Dependencies:
import { MagicBlueBulb } from 'magicblue';

// Constants:
const BULB = new MagicBlueBulb();
const WAIT = 250;

export async function connect () {
    if (!(<any>BULB).characteristic) {
        try {
            console.log('connecting');
            await BULB.connect();
            console.log('connected');
            await BULB.powerOn();
            await setColor(255, 0, 0);
            await setColor(255, 255, 0);
            await setColor(0, 255, 0);
            await setColor(0, 255, 255);
            await setColor(0, 0, 255);
            await setColor(255, 0, 255);
            await setColor(255, 255, 255);
        } catch (error) {
            console.error(error);
        }
    }
}

export async function disconnect () {
    if ((<any>BULB).characteristic) {
        try {
            await setColor(255, 255, 255);
            await BULB.powerOff();
            await BULB.disconnect();
        } catch (error) {
            console.error(error);
        }
    }
}

export async function setColor (r: number, g: number, b: number) {
    await BULB.setColor(r, g, b);
    await wait();
}

function wait () {
    return new Promise(res => setTimeout(res, WAIT));
}
