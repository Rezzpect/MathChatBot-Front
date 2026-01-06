import { useState } from "react";

interface TabItem {
    label: string,
    content: React.ReactNode
}

interface TabMenuProps {
    tab_data: TabItem[]
}

export default function TabMenu({ tab_data }: TabMenuProps) {
    const [tabIndex, setTabIndex] = useState(0);
    // const tab_list = ["Tab 1", "Tab 2", "Tab 3"]

    return (
        <div className="h-auto w-full text-neutral-content">
            {/* Tab menu */}
            <div className="flex">
                {
                    tab_data.map((tab, index) =>
                        <div className={`font-bold text-xl min-w-50 p-2 rounded-lg"
                            ${index !== 0 ? "ml-[-10px]" : ""}
                            ${tabIndex === index ?
                                "text-primary-content bg-primary" :
                                "text-neutral-content bg-neutral"}`}
                            style={{
                                clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)',
                                borderTopLeftRadius: '1rem',
                                borderTopRightRadius: '1rem',
                            }}
                            onClick={() => setTabIndex(index)}
                        > {tab.label} </div>
                    )
                }
            </div>

            {/* Tab Content */}
            <div className="bg-base-100 rounded-b-lg rounded-r-lg w-full h-auto px-5 shadow-sm">
                <div>
                    {
                        tab_data[tabIndex].content
                    }
                </div>
            </div>
        </div>
    );
}