import { DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";

interface AccordionProps {
  defaultActiveIndex?: number;
  items: { key: number; title: string | JSX.Element; children: JSX.Element }[];
}

const Accordion = ({ defaultActiveIndex = 0, items }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    defaultActiveIndex
  );

  const handleActiveIndexChange = (key: number) => {
    if (key === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(key);
    }
  };

  return (
    <div>
      {items?.map((item) => (
        <React.Fragment key={item?.key}>
          <>
            <button
              className={`flex items-center justify-between w-full p-4 font-medium rtl:text-right  text-gray-500 border border-gray-200 dark:border-gray-800 ${
                item?.key === 0 && "rounded-t-md border-b-0"
              } ${
                item?.key === items?.length - 1 && "rounded-b-md"
              }  hover:bg-gray-100 dark:bg-gray-900 gap-3`}
              onClick={() => handleActiveIndexChange(item?.key)}
            >
              <span>{item?.title}</span>
              <DownOutlined
                className={`transition-all duration-100 ${
                  activeIndex === item?.key ? "rotate-180" : ""
                }`}
              />
            </button>
          </>
          <div
            className={`border border-gray-200 dark:border-gray-800 p-2 ${
              item?.key !== activeIndex ? "hidden" : ""
            }`}
          >
            {item?.children}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Accordion;
