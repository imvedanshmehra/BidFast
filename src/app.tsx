import { useEffect, useState } from "react";

const App = () => {
  const [autoFillEnabled, setAutoFillEnabled] = useState(false);
  const [proposal, setProposal] = useState("");

  const handleAutoFillToggle = () => {
    setAutoFillEnabled((prev) => !prev);
  };

  useEffect(() => {
    // Get proposal from local storage if exists
    chrome?.storage?.local?.get(["proposal", "autoFillCoverLetter"], (data) => {
      if (data?.proposal) {
        setProposal(data?.proposal);
      }
      if (data?.autoFillCoverLetter) {
        setAutoFillEnabled(true);
      }
    });
  }, []);

  useEffect(() => {
    // Debounce event before storing on chrome storage
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
    }, 3000);

    return () => clearTimeout(timeout);
  }, [proposal]);

  useEffect(() => {
    chrome?.storage?.local?.set({
      autoFillCoverLetter: autoFillEnabled,
    });
  }, [autoFillEnabled]);

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
        // <Accordion
        //   items={[
        //     {
        //       key: 0,
        //       title: (
        //         <div className="flex gap-2 mb-2">
        //           <label
        //             htmlFor="proposal1"
        //             className="block text-sm font-medium text-gray-900"
        //           >
        //             Proposal 1
        //           </label>
        //           {defaultProposal ? (
        //             <span className="bg-blue-100 text-blue-500 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
        //               Default
        //             </span>
        //           ) : (
        //             <label className="inline-flex items-center cursor-pointer">
        //               <input
        //                 type="checkbox"
        //                 checked={defaultProposal === 0}
        //                 onChange={() => handleToggleDefault(0)}
        //                 className="sr-only peer"
        //               />
        //               <div className="relative w-7 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
        //               <span className="ms-2 text-sm font-medium text-gray-900">
        //                 Mark as Default
        //               </span>
        //             </label>
        //           )}
        //         </div>
        //       ),
        //       children: (
        //         <textarea
        //           id="proposal"
        //           rows={12}
        //           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        //           placeholder="Write your customized proposal here..."
        //           value={proposal}
        //           onChange={(e) => setProposal(e?.target?.value)}
        //         />
        //       ),
        //     },
        //     {
        //       key: 1,
        //       title: (
        //         <div className="flex gap-2 mb-2">
        //           <label
        //             htmlFor="proposal2"
        //             className="block text-sm font-medium text-gray-900"
        //           >
        //             Proposal 2
        //           </label>
        //           {defaultProposal ? (
        //             <span className="bg-blue-100 text-blue-500 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
        //               Default
        //             </span>
        //           ) : (
        //             <label className="inline-flex items-center cursor-pointer">
        //               <input
        //                 type="checkbox"
        //                 checked={defaultProposal === 1}
        //                 onChange={() => handleToggleDefault(1)}
        //                 className="sr-only peer"
        //               />
        //               <div className="relative w-7 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
        //               <span className="ms-2 text-sm font-medium text-gray-900">
        //                 Mark as Default
        //               </span>
        //             </label>
        //           )}
        //         </div>
        //       ),
        //       children: (
        //         <textarea
        //           id="proposal"
        //           rows={12}
        //           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        //           placeholder="Write your customized proposal here..."
        //           value={proposal2}
        //           onChange={(e) => setProposal2(e?.target?.value)}
        //         />
        //       ),
        //     },
        //   ]}
        // />
        <div>
          <div className="flex gap-2 mb-2">
            <label
              htmlFor="proposal1"
              className="block text-sm font-medium text-gray-900"
            >
              Proposal 1
            </label>
            <span className="bg-blue-100 text-blue-500 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              Default
            </span>
          </div>
          <textarea
            id="proposal"
            rows={12}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Write your customized proposal here..."
            value={proposal}
            onChange={(e) => setProposal(e?.target?.value)}
          />
        </div>
      )}
    </>
  );
};

export default App;
