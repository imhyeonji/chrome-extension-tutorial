const nameInput = document.getElementById("name-input");
const timeInput = document.getElementById("time-input");
const saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener("click", () => {
  const name = nameInput.value;

  // 여기서 sync api를 사용해서 스토리지에 저장한 데이터는
  // 크롬에서 익스텐션을 완전히 제거하기 전까지 사라지지 않는다.
  chrome.storage.sync.set({
    name,
  });
});

chrome.storage.sync.get(["name"], (result) => {
  nameInput.value = result.name ?? "name not entered";
});

/**
 * 유저가 입력한 input 값을 저장할 공간이 필요함 => Chrome storage api
 * https://developer.chrome.com/docs/extensions/reference/storage/
 *
 */
