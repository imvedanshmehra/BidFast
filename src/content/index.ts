const localChromeStorage = chrome?.storage?.local;

const isElementLoaded = async (selector: string) => {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  return document.querySelector(selector);
};

isElementLoaded(".air3-textarea .inner-textarea")?.then(() => {
  localChromeStorage?.get(["proposal", "autoFillCoverLetter"], (data) => {
    if (data?.autoFillCoverLetter && data?.proposal) {
      const coverLetterTextArea = document.getElementsByClassName(
        "air3-textarea inner-textarea"
      )[0] as HTMLInputElement;

      if (coverLetterTextArea) {
        coverLetterTextArea.value = data?.proposal;
        coverLetterTextArea.dispatchEvent(
          new Event("input", { bubbles: true })
        );
      }
    }
  });
});
