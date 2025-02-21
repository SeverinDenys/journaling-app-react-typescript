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

    const deleteJournal = (id: string) => {
        const updatedJournals = journals.filter(journal => journal.id !== id)
        setJournals(updatedJournals)
        const updatedJournalsStr = JSON.stringify(updatedJournals)
        localStorage.setItem('journals', updatedJournalsStr)

        closeJournal()
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

            {journals.length === 0 && (
                <div className="w-full rounded-xl bg-white p-3 text-center font-medium">
                    <p>There are no published journals yet.</p>
                </div>
            )}

            {journal.id !== '' && (
                <div className="relative mx-auto flex max-h-[640px] w-full max-w-screen-sm flex-col overflow-y-scroll rounded-xl bg-white p-4 md:p-8">
                    {/* Эмотиконка (перемещена в угол и уменьшена) */}
                    <div className="absolute right-2 top-2 h-16 w-16 opacity-30">
                        {journal.emotion === 'Sad' ? (
                            <ImSad size="100%" />
                        ) : journal.emotion === 'Happy' ? (
                            <ImHappy size="100%" />
                        ) : (
                            <ImNeutral size="100%" />
                        )}
                    </div>

                    {/* Заголовок с переносом */}
                    <h2 className="font-playfair z-10 mb-2 break-words text-3xl font-bold">
                        {journal.title}
                    </h2>
                    <h3 className="mb-4 text-gray-500">
                        Created at {journal.createdAt}
                    </h3>

                    {/* Тело с переносом текста */}
                    <p className="break-words text-lg">{journal.body}</p>

                    <div className="flex justify-between gap-2">
                        <button
                            className="btn mt-2 flex-1 p-2 md:p-4"
                            onClick={() => deleteJournal(journal.id)}
                        >
                            Delete
                        </button>
                        <button
                            className="btn btn-secondary mt-2 flex-1"
                            onClick={closeJournal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default JournalList
