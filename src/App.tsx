import { useState } from 'react'
import AddJournalForm from './components/AddJournalForm'
import Tabs from './components/Tabs'
import JournalList from './components/JournalList'

function App() {
    const [currentTab, setCurrentTab] = useState('add')

    const handleTab = (selectedTab: string) => {
        setCurrentTab(selectedTab)
    }

    return (
        <>
            <div className="mx-auto flex min-h-screen w-full max-w-[640px] flex-col px-4 py-4">
                <div className="flex flex-col gap-2 rounded-xl bg-white p-4 text-black sm:p-6 md:p-8">
                    <header>
                        <h1 className="mb-4 border-b border-gray-300 pb-3 text-xl font-bold sm:text-2xl md:text-3xl">
                            Journaling App
                        </h1>
                        <p>
                            Embrace each day with reflection: Capture your
                            moments, chart your growth, and craft your journey,
                            one story at a time.
                        </p>
                    </header>

                    <Tabs onSelectTab={handleTab} />

                    <div className="flex flex-col gap-3 rounded-xl bg-gray-200 p-4 sm:p-6">
                        {currentTab === 'add' ? (
                            <AddJournalForm />
                        ) : (
                            <JournalList />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
