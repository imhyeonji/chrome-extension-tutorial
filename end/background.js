// // background는 별도의 DOM이 없이 자바스크립트 파일만 실행된다.
console.log("Hello from background script");

// https://developer.chrome.com/docs/extensions/reference/alarms/
chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.local.get(["timer", "isRunning"], (result) => {
    const time = result.timer ?? 0;
    const isRunning = result.isRunning ?? true;

    if (!isRunning) return;

    chrome.storage.local.set({
      timer: time + 1,
    });

    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });

    const notificationTime = 10;
    // 10초에 한번씩 알람을 실행
    if (time % 10 === 0) {
      // background 스크립트에서 this는 ServiceWorkerGlobalScope이다.
      // console.log(this);
      this.registration.showNotification("Chrome Timer Extension", {
        body: `${notificationTime} second has passed`,
        icon: "icon.png",
      });
    }
  });
});
