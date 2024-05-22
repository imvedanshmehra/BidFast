import { useEffect, useState } from "react";
import Accordion from "./components/accordion";
import Tag from "./components/tag";

const App = () => {
  const [autoFillEnabled, setAutoFillEnabled] = useState(false);
  const [proposal, setProposal] = useState("");
  const [proposal2, setProposal2] = useState("");
  const [defaultProposal, setDefaultProposal] = useState(0);

  const handleToggleDefault = (proposalKey: number) => {
    setDefaultProposal(proposalKey);
  };

  const handleAutoFillToggle = () => {
    setAutoFillEnabled((prev) => !prev);
  };

  useEffect(() => {
    // Fill state based on stored values
    chrome?.storage?.local?.get(
      ["proposal", "autoFillCoverLetter", "proposal2", "defaultProposal"],
      (data) => {
        if (data?.proposal) {
          setProposal(data?.proposal);
        }
        if (data?.proposal2) {
          setProposal2(data?.proposal2);
        }
        if (data?.autoFillCoverLetter) {
          setAutoFillEnabled(true);
        }
        if (data?.defaultProposal) {
          setDefaultProposal(data?.defaultProposal);
        }
      }
    );
  }, []);

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

  useEffect(() => {
    chrome?.storage?.local?.set({
      autoFillCoverLetter: autoFillEnabled,
    });
  }, [autoFillEnabled]);

  useEffect(() => {
    chrome?.storage?.local?.set({
      defaultProposal,
    });
  }, [defaultProposal]);

  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-2">BidFast 🚀</h2>
      <div className="flex items-center mb-4">
        <input
          id="autofill-checkbox"
          type="checkbox"
          className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
          checked={autoFillEnabled}
          onChange={handleAutoFillToggle}
        />
        <label htmlFor="autofill-checkbox" className="ms-2 text-sm font-medium">
          Autofill Cover Letter
        </label>
      </div>
      {autoFillEnabled && (
        // TODO: ADD SECONDARY PROPOSAL
        <Accordion
          defaultActiveIndex={defaultProposal}
          items={[
            {
              key: 0,
              title: (
                <div className="flex items-center gap-2 mb-2">
                  <label
                    htmlFor="proposal1"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Proposal 1
                  </label>
                  {defaultProposal === 0 && <Tag text="Default" />}
                </div>
              ),
              children: (
                <>
                  <textarea
                    id="proposal"
                    rows={12}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Write your customized proposal here..."
                    value={proposal}
                    onChange={(e) => setProposal(e?.target?.value)}
                  />
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
                      className="ms-2 text-sm font-medium"
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
                    className="block text-sm font-medium text-gray-900"
                  >
                    Proposal 2
                  </label>
                  {defaultProposal === 1 && <Tag text="Default" />}
                </div>
              ),
              children: (
                <>
                  <textarea
                    id="proposal"
                    rows={12}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Write your customized proposal here..."
                    value={proposal2}
                    onChange={(e) => setProposal2(e?.target?.value)}
                  />
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
                      className="ms-2 text-sm font-medium"
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
    </>
  );
};

export default App;
