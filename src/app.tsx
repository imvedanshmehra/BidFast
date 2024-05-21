import { useEffect, useState } from "react";

const App = () => {
  const [autoFillEnabled, setAutoFillEnabled] = useState(false);
  const [proposal, setProposal] = useState("");

  const handleAutoFillToggle = () => {
    setAutoFillEnabled((prev) => !prev);
  };

  const handleProposalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProposal(e?.target?.value);
  };

  useEffect(() => {
    chrome?.storage?.local?.get(["proposal"], (data) => {
      if (data?.proposal) {
        setProposal(data?.proposal);
        setAutoFillEnabled(true);
      }
    });
  }, []);

  // Debounce event before storing on chrome storage
  useEffect(() => {
    const timeout = setTimeout(() => {
      chrome?.storage?.local?.set({
        proposal,
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [proposal]);

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
        <div>
          <label
            htmlFor="proposal1"
            className="block text-sm font-medium text-gray-900"
          >
            Proposal
          </label>
          <textarea
            id="proposal"
            rows={12}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Write your customized proposal here..."
            value={proposal}
            onChange={handleProposalChange}
          />
        </div>
      )}
    </>
  );
};

export default App;
