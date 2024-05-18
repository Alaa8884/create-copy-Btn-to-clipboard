let copyBtns = document.querySelectorAll(".copy-btn");

async function copyCode(e) {
  e.preventDefault();
  let codeElement = this.nextElementSibling.firstChild;
  let codeText = codeElement.textContent;

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(codeText);
      changeCopyIcon(this, "Code Copied");
    } catch {
        iconErrorMessage(this)
    }
    return;
  }
  // Old Browsers
  if (!navigator.clipboard) {
    copyOldBrowser(codeText);
  }
}


function changeCopyIcon(el, message) {
  el.firstChild.classList.remove("fa-regular", "fa-beat");
  el.firstChild.classList.add("fa-solid");
  el.dataset.title = message;
  setTimeout(() => {
    resetIcon(el)
  }, 4000);
}

function resetIcon(el) {
  el.firstChild.classList.remove("fa-solid");
  el.firstChild.classList.add("fa-regular", "fa-beat");
  el.dataset.title = "Copy The Code";
}

function iconErrorMessage(el) {
  el.firstChild.classList.remove("fa-beat");
  el.firstChild.classList.add("fa-shake");
  el.dataset.title = "Click again to copy";
}

function copyOldBrowser(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

copyBtns.forEach((btn) => btn.addEventListener("click", copyCode));


