import { isElementLoaded } from "../utils";

isElementLoaded(".air3-textarea .inner-textarea")?.then(() => {
  chrome?.storage?.local?.get(
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

isElementLoaded(".fe-proposal-github-link")?.then(() => {
  chrome?.storage?.local?.get(
    ["autoFillGithubURL", "githubRepoUrl"],
    (data) => {
      if (data?.autoFillGithubURL) {
        const githubProjectLink = document
          .getElementsByClassName("fe-proposal-github-link")[0]
          ?.querySelector(".air3-input") as HTMLInputElement;

        if (githubProjectLink) {
          githubProjectLink.value = data?.githubRepoUrl || "";
          githubProjectLink.dispatchEvent(
            new Event("input", { bubbles: true })
          );
        }
      }
    }
  );
});
