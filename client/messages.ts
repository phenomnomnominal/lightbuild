// Dependecnies:
import { setColor } from './bulb';

// Constants:
const VOICE = 'Zarvox';

navigator.serviceWorker.addEventListener('message', (event: ServiceWorkerMessageEvent) => {
    try {
        let { message, status } = JSON.parse(event.data).data;
        if (status === 'SUCCESS') {
            try {
                setColor(0, 255, 0);
            } catch (error) {

            }
        } else if (status === 'FAILURE') {
            try {
                setColor(255, 0, 0);
            } catch (error) {

            }
        }

        if (message) {
            let utterance = new SpeechSynthesisUtterance(message.replace(/^[^A-Za-z]+/, ''));
            utterance.voice = window.speechSynthesis.getVoices().find(v => v.name === VOICE);
            window.speechSynthesis.speak(utterance);
        }
    } catch (e) {

    }
});
