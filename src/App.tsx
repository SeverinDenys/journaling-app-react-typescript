import Tabs from "./components/Tabs"

function App() {
    return (
        <>
            <div className="mx-auto flex w-[640px] flex-col py-4">
                <div className="flex flex-col gap-2 rounded-xl bg-white p-4 text-black">
                    <header>
                        <h1 className="mb-4 border-b border-gray-300 pb-3 text-2xl font-bold">
                            Journaling App
                        </h1>
                        <p>
                            Embrace each day with reflection: Capture your
                            moments, chart your growth, and craft your journey,
                            one story at a time.
                        </p>
                    </header>

                 <Tabs/>
                </div>
            </div>
        </>
    )
}

export default App
