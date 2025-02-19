import { useState } from 'react'

const Tabs = () => {
    const [selectedTab, setSelectedTab] = useState('add')

    const handleToogleTab = (selectedTab: string) => {
        setSelectedTab(selectedTab)
    }
    return (
        <>
            <div role="tablist" className="tabs tabs-boxed tabs-sm">
                <a
                    role="tab"
                    className={`tab ${selectedTab === 'add' && 'tab-active font-bold'}`}
                    onClick={() => handleToogleTab('add')}
                >
                    Add Entry
                </a>
                <a
                    role="tab"
                    className={`tab ${selectedTab === 'entries' && 'tab-active font-bold'} `}
                    onClick={() => handleToogleTab('entries')}
                >
                    Journal Entries
                </a>
            </div>
        </>
    )
}

export default Tabs
