const statusText = document.getElementById("status");
const errorDiv = document.getElementById("error");
const debugText = document.getElementById("debug");
const notWorking = document.getElementById("notWorking");
const selectAll = document.getElementById("selectAll");
const copy = document.getElementById("copy");

let retried = false;

const error = (error) => {
  console.error(error);

  debugText.innerText = error;

  statusText.innerText = "Oh no! Couldn't copy a zero-width space to your clipboard.";

  notWorking.style.display = "none";
  errorDiv.style.display = "block";

  if (error !== "Manually triggered." && (!retried || !document.hasFocus())) {
    console.log("Retrying in 500ms...");
    setTimeout(run, 500);
    retried = true;
  }
};

const run = () => {
  if (!navigator.clipboard) return error("Property navigator.clipboard does not exist");

  navigator.clipboard
    .writeText("\u200B")
    .then(() => {
      statusText.innerText = "Copied a zero-width space to your clipboard!";

      notWorking.style.display = "block";
      errorDiv.style.display = "none";
    })
    .catch(error);
};

run();

if (navigator.userAgent.includes("like Mac")) {
  selectAll.innerHTML = "Press on the text field to focus, tap on the field, then press <code>Select All</code>.";
  copy.innerHTML = "Press <code>Copy</code>.";
} else if (navigator.userAgent.includes("Android")) {
  selectAll.innerHTML = "Press on the text field to focus, long press on it, then press <code>Select All</code>.";
  copy.innerHTML = "Press <code>Copy</code>.";
} else if (navigator.userAgent.includes("Win")) {
  selectAll.innerHTML = "Click on the text field and press <kbd>Ctrl</kbd> + <kbd>A</kbd>.";
  copy.innerHTML = "Press <kbd>Ctrl</kbd> + <kbd>C</kbd>.";
} else if (navigator.userAgent.includes("Mac")) {
  selectAll.innerHTML = "Click on the text field and press <kbd>Cmd</kbd> + <kbd>A</kbd>.";
  copy.innerHTML = "Press <kbd>Cmd</kbd> + <kbd>C</kbd>.";
} else if (navigator.userAgent.includes("Linux")) {
  selectAll.innerHTML = "Click on the text field and press <kbd>Ctrl</kbd> + <kbd>A</kbd>.";
  copy.innerHTML = "Press <kbd>Ctrl</kbd> + <kbd>C</kbd>.";
}
