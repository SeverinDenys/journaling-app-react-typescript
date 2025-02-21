import { useState } from 'react'

interface Props {
    onSelectTab: (tab: string) => void
}

const Tabs = ({onSelectTab}: Props) => {
    const [selectedTab, setSelectedTab] = useState('add')

    const handleTogleTab = (selectedTab: string) => {
        setSelectedTab(selectedTab)
        onSelectTab(selectedTab)
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
