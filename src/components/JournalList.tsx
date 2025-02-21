import { useEffect, useState } from 'react'

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

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {journals.map(journal => (
                    <div
                        className="rounded-lg bg-white p-4 transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer hover:shadow-xl"
                        key={journal.id}
                    >
                        <h3 className="font-playfair mb-2 text-xl font-bold">
                            {journal.title}
                        </h3>
                        <h4>Created at: {journal.createdAt}</h4>
                    </div>
                ))}
            </div>
        </>
    )
}

export default JournalList
