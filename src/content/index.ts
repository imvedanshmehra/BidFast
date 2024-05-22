import { isElementLoaded } from "../utils";

const localChromeStorage = chrome?.storage?.local;

isElementLoaded(".air3-textarea .inner-textarea")?.then(() => {
  localChromeStorage?.get(
    ["proposal", "autoFillCoverLetter", "proposal2", "defaultProposal"],
    (data) => {
      if (data?.autoFillCoverLetter) {
        const coverLetterTextArea = document.getElementsByClassName(
          "air3-textarea inner-textarea"
        )[0] as HTMLInputElement;

        if (coverLetterTextArea) {
          coverLetterTextArea.value =
            !data?.defaultProposal || data?.defaultProposal === 0
              ? data?.proposal || ""
              : data?.proposal2 || "";
          coverLetterTextArea.dispatchEvent(
            new Event("input", { bubbles: true })
          );
        }
      }
    }
  );
});
