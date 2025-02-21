import { useEffect, useState } from 'react'
import { ImHappy } from 'react-icons/im'
import { ImNeutral } from 'react-icons/im'
import { ImSad } from 'react-icons/im'

const JournalList = () => {
    useEffect(() => {
        const hasJournals = localStorage.getItem('journals')
        const journalEntries = hasJournals ? JSON.parse(hasJournals) : []

        setJournals(journalEntries)
    }, [])

    const [journals, setJournals] = useState([
        {
            id: '',
            title: '',
            emotion: '',
            body: '',
            createdAt: ''
        }
    ])

    const initJournalState = {
        id: '',
        title: '',
        emotion: '',
        body: '',
        createdAt: ''
    }

    const [journal, setJournal] = useState(initJournalState)
    const closeJournal = () => {
      setJournal(initJournalState)
    }

    const onViewJournal = (journal: {
        id: string
        title: string
        emotion: string
        body: string
        createdAt: string
    }) => {
        setJournal(journal)
    }

    return (
        <>
            {journals.length >= 1 && journal.id === '' && (
                <div className="grid grid-cols-2 gap-4">
                    {journals.map(journal => (
                        <div
                            className="rounded-lg bg-white p-4 transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer hover:shadow-xl"
                            key={journal.id}
                            onClick={() => onViewJournal(journal)}
                        >
                            <h3 className="font-playfair mb-2 text-xl font-bold">
                                {journal.title}
                            </h3>
                            <h4>Created at: {journal.createdAt}</h4>
                        </div>
                    ))}
                </div>
            )}

            {journal.id !== '' && (
                <div className="relative flex max-h-[640px] flex-col overflow-y-scroll rounded-xl bg-white p-8">
                    {journal.emotion === 'Sad' ? (
                        <ImSad
                            size={128}
                            className="absolute -right-0 -top-3 z-0 text-gray-200"
                        />
                    ) : journal.emotion === 'Happy' ? (
                        <ImHappy
                            size={128}
                            className="absolute -right-0 -top-3 z-0 text-gray-200"
                        />
                    ) : (
                        <ImNeutral
                            size={128}
                            className="absolute -right-0 -top-3 z-0 text-gray-200"
                        />
                    )}
                    <h2 className="font-playfair z-10 mb-2 text-4xl font-bold">
                        {journal.title}
                    </h2>
                    <h3 className="mb-4 text-gray-500">
                        Created at {journal.createdAt}
                    </h3>
                    <p className="text-lg">{journal.body}</p>
                    <div className="flex justify-between gap-2">
                        <button className="btn mt-2 flex-1">Delete</button>
                        <button className="btn btn-secondary mt-2 flex-1" onClick={closeJournal}>
                            close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default JournalList
