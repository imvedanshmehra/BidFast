import { useEffect, useState } from "react";
import Accordion from "./components/accordion";
import Tag from "./components/tag";
import {
  CheckCircleFilled,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";

const App = () => {
  const [autoFillCoverLetterEnabled, setAutoFillCoverLetterEnabled] =
    useState(false);
  const [proposal, setProposal] = useState("");
  const [proposal2, setProposal2] = useState("");
  const [defaultProposal, setDefaultProposal] = useState(0);
  const [autofillGithubRepoEnabled, setAutoFillGithubRepoEnabled] =
    useState(false);
  const [githubRepoUrl, setGithubRepoUrl] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDefault = (proposalKey: number) => {
    setDefaultProposal(proposalKey);
  };

  const handleAutoFillToggle = () => {
    setAutoFillCoverLetterEnabled((prev) => !prev);
  };

  useEffect(() => {
    // Fill state based on stored values
    chrome?.storage?.local?.get(
      [
        "proposal",
        "autoFillCoverLetter",
        "proposal2",
        "defaultProposal",
        "autoFillGithubURL",
        "githubRepoUrl",
      ],
      (data) => {
        if (data?.proposal) {
          setProposal(data?.proposal);
        }
        if (data?.proposal2) {
          setProposal2(data?.proposal2);
        }
        if (data?.autoFillCoverLetter) {
          setAutoFillCoverLetterEnabled(true);
        }
        if (data?.defaultProposal) {
          setDefaultProposal(data?.defaultProposal);
        }
        if (data?.autoFillGithubURL) {
          setAutoFillGithubRepoEnabled(data?.autoFillGithubURL);
        }
        if (data?.githubRepoUrl) {
          setGithubRepoUrl(data?.githubRepoUrl);
        }
      }
    );
  }, []);

  // Store proposal 1 in local storage
  useEffect(() => {
    // Debounce event before storing in chrome storage
    const localChromeStorage = chrome?.storage?.local;

    const timeout = setTimeout(() => {
      localChromeStorage?.get(["proposal"], (data) => {
        if (data?.proposal) {
          localChromeStorage?.remove("proposal");
        }

        localChromeStorage?.set({
          proposal,
        });
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [proposal]);

  // Store proposal 2 in local storage
  useEffect(() => {
    // Debounce event before storing in chrome storage
    const localChromeStorage = chrome?.storage?.local;
    const timeout = setTimeout(() => {
      localChromeStorage?.get(["proposal2"], (data) => {
        if (data?.proposal2) {
          localChromeStorage?.remove("proposal2");
        }

        localChromeStorage?.set({
          proposal2,
        });
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [proposal2]);

  // Store github url in local storage
  useEffect(() => {
    // Debounce event before storing in chrome storage
    const localChromeStorage = chrome?.storage?.local;
    const timeout = setTimeout(() => {
      localChromeStorage?.get(["githubRepoUrl"], (data) => {
        if (data?.githubRepoUrl) {
          localChromeStorage?.remove("githubRepoUrl");
        }

        localChromeStorage?.set({
          githubRepoUrl,
        });
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [githubRepoUrl]);

  useEffect(() => {
    chrome?.storage?.local?.set({
      autoFillCoverLetter: autoFillCoverLetterEnabled,
    });
  }, [autoFillCoverLetterEnabled]);

  useEffect(() => {
    chrome?.storage?.local?.set({
      autoFillGithubURL: autofillGithubRepoEnabled,
    });
  }, [autofillGithubRepoEnabled]);

  useEffect(() => {
    chrome?.storage?.local?.set({
      defaultProposal,
    });
  }, [defaultProposal]);

  const darkModeHandler = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <div className="flex items-center mb-2">
        <h2 className="flex-1 text-xl font-semibold text-center dark:text-white">
          BidFast 🚀
        </h2>
        <button
          onClick={darkModeHandler}
          className={`dark:text-white text-2xl mr-4 bg-gray-200 dark:bg-gray-800 w-10 h-10 rounded-full`}
          title={`Switch to ${isDarkMode ? "Light" : "Dark"} Theme`}
        >
          {isDarkMode && <SunOutlined />}
          {!isDarkMode && <MoonOutlined />}
        </button>
      </div>
      <div className="flex items-center mb-4">
        <input
          id="autofill-checkbox"
          type="checkbox"
          className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
          checked={autoFillCoverLetterEnabled}
          onChange={handleAutoFillToggle}
        />
        <label
          htmlFor="autofill-checkbox"
          className="ms-2 text-sm font-medium dark:text-white"
        >
          Auto-fill Cover Letter
        </label>
      </div>
      {autoFillCoverLetterEnabled && (
        <Accordion
          defaultActiveIndex={defaultProposal}
          items={[
            {
              key: 0,
              title: (
                <div className="flex items-center gap-2 mb-2">
                  <label
                    htmlFor="proposal1"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Proposal 1
                  </label>
                  {defaultProposal === 0 && (
                    <Tag text="Default" extra={<CheckCircleFilled />} />
                  )}
                </div>
              ),
              children: (
                <>
                  <textarea
                    id="proposal"
                    rows={12}
                    className="bg-gray-50 dark:bg-gray-900 dark:text-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Your customized proposal..."
                    maxLength={5000}
                    value={proposal}
                    onChange={(e) => setProposal(e?.target?.value)}
                  />
                  {!!proposal && (
                    <p className="text-xs font-light dark:text-gray-400">
                      {5000 - proposal?.length} Characters Left
                    </p>
                  )}
                  <div className="flex items-center justify-end mt-2">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                      checked={defaultProposal === 0}
                      onChange={() => handleToggleDefault(0)}
                      disabled={defaultProposal === 0}
                    />
                    <label
                      htmlFor="autofill-checkbox"
                      className="ms-2 text-sm font-medium dark:text-white"
                    >
                      Mark as Default
                    </label>
                  </div>
                </>
              ),
            },
            {
              key: 1,
              title: (
                <div className="flex items-center gap-2 mb-2">
                  <label
                    htmlFor="proposal2"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Proposal 2
                  </label>
                  {defaultProposal === 1 && (
                    <Tag text="Default" extra={<CheckCircleFilled />} />
                  )}
                </div>
              ),
              children: (
                <>
                  <textarea
                    id="proposal"
                    rows={12}
                    className="bg-gray-50 dark:bg-gray-900 dark:text-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Your customized proposal..."
                    maxLength={5000}
                    value={proposal2}
                    onChange={(e) => setProposal2(e?.target?.value)}
                  />
                  {!!proposal2 && (
                    <p className="text-xs font-light dark:text-gray-400">
                      {5000 - proposal2?.length} Characters Left
                    </p>
                  )}
                  <div className="flex items-center justify-end mt-2">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                      checked={defaultProposal === 1}
                      onChange={() => handleToggleDefault(1)}
                      disabled={defaultProposal === 1}
                    />
                    <label
                      htmlFor="autofill-checkbox"
                      className="ms-2 text-sm font-medium dark:text-white"
                    >
                      Mark as Default
                    </label>
                  </div>
                </>
              ),
            },
          ]}
        />
      )}
      <div className="flex items-center my-4">
        <input
          id="autofill-github-url"
          type="checkbox"
          className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
          checked={autofillGithubRepoEnabled}
          onChange={() => setAutoFillGithubRepoEnabled((prev) => !prev)}
        />
        <label
          htmlFor="autofill-github-url"
          className="ms-2 text-sm font-medium dark:text-white"
        >
          Auto-fill Github Project URL
        </label>
      </div>
      {autofillGithubRepoEnabled && (
        <div>
          <label
            htmlFor="github-repo-url-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Github Project URL
          </label>
          <input
            type="url"
            id="github-repo-url-input"
            className="bg-gray-50 dark:bg-gray-900 dark:text-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Your Github Project URL"
            value={githubRepoUrl}
            onChange={(e) => setGithubRepoUrl(e.target?.value)}
          />
        </div>
      )}
    </>
  );
};

export default App;
