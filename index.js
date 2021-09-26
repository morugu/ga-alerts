const GA_VIEW_ID = 'XXXXX';
const SLACK_INCOMING_WEBHOOK_URL = 'https://hooks.slack.com/services/XXXXX';
const THRESHOLD_NUMBER = 100;

const execute = () => {
  const activeUsersNumber = getActiveUsersNumber();
  if (activeUsersNumber >= THRESHOLD_NUMBER) {
    sendSlack(activeUsersNumber);
  }
};

const getActiveUsersNumber = () => {
  const activeUsersNumber = Analytics.Data.Realtime.get(`ga:${GA_VIEW_ID}`, 'rt:activeUsers').getRows();
  return parseInt(activeUsersNumber);
};

const sendSlack = (activeUsersNumber) => {
  const data = {
    text: `Right now ${activeUsersNumber} active users on site!`,
  };
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(data),
  };
  UrlFetchApp.fetch(SLACK_INCOMING_WEBHOOK_URL, options);
};
