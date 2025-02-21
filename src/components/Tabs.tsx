import { useState } from 'react'

const Tabs = () => {
    const [selectedTab, setSelectedTab] = useState('add')

    const handleTogleTab = (selectedTab: string) => {
        setSelectedTab(selectedTab)
    }
    return (
        <>
            <div role="tablist" className="tabs tabs-boxed tabs-sm">
                <a
                    role="tab"
                    className={`tab ${selectedTab === 'add' && 'tab-active font-bold'}`}
                    onClick={() => handleTogleTab('add')}
                >
                    Add Entry
                </a>
                <a
                    role="tab"
                    className={`tab ${selectedTab === 'entries' && 'tab-active font-bold'} `}
                    onClick={() => handleTogleTab('entries')}
                >
                    Journal Entries
                </a>
            </div>
        </>
    )
}

export default Tabs
