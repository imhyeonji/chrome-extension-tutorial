const timeElement = document.getElementById("time");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");

function updateTimeElement() {
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `The time is: ${currentTime}`;

  chrome.storage.local.get(["timer"], (result) => {
    const time = result.timer ?? 0;
    timerElement.textContent = `The timer is at : ${time} seconds`;
  });
}

updateTimeElement();
setInterval(updateTimeElement, 1000);

/**
 * https://developer.chrome.com/docs/extensions/reference/browserAction/
 * 브라우저의 action api
 */
// chrome.action.setBadgeText(
//   {
//     text: "TIME",
//   },
//   () => {
//     console.log("Finished setting badge text.");
//   }
// );

chrome.storage.sync.get(["name"], (result) => {
  if (!result.name) return;
  nameElement.textContent = `Your name is : ${result.name}`;
});
