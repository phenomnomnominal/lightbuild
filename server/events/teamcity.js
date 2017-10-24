// Dependencies:
const TeamCityClient = require('teamcity-client');
const { addTask } = require('../poller');
const { sendNotification } = require('../push');

// Constants:
const FAILURE = 'FAILURE';
const SUCCESS = 'SUCCESS';

const teamcity = new TeamCityClient({
    host: process.env.TC_HOST,
    user: process.env.TC_USER,
    password: process.env.TC_PW
});

let status;
addTask(tangramBuildStatus);

async function tangramBuildStatus () {
    try {
        let buildInfo = await teamcity.build.detail({
            project: 'TradeMeTangramPackage',
            branch: 'default:any'
        });
        if (buildInfo.status !== status) {
            status = buildInfo.status;
            sendNotification('STATUS CHANGED', {
                status,
                statusText: buildInfo.statusText,
                message: getMessage(status),
                url: buildInfo.webUrl
            });
        }
    } catch (error) {

    }
}

function getMessage (status) {
    if (status === FAILURE) {
        return '⚠️ Latest Tangram build failed!';
    }
    if (status === SUCCESS) {
        return '⭐️ Latest Tangram build passed';
    }
}
