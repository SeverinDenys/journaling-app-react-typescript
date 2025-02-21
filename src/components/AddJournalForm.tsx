import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
    title: z
        .string({ required_error: 'The journal title is required.' })
        .min(5, {
            message: 'The journal title must have at least 5 characters'
        }),
    emotion: z
        .string({ required_error: 'Please specify how you are feeling today.' })
        .min(3, {
            message: 'The emotion field must have at least 3 characters.'
        }),
    body: z
        .string({ required_error: 'Please write something for this journal' })
        .min(128, {
            message: 'Your journal must have at least 128 characters.'
        })
})

type FormData = z.infer<typeof schema>

const AddJournalForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({ resolver: zodResolver(schema) })

    const onFormSubmit = (data: FieldValues) => {
        // get the id for journal entry
        const uuid = crypto.randomUUID()
        data.id = uuid

        // add the current timestamp for the journal entry
        const now = new Date()
        data.createdAt = now.toLocaleDateString('en-US', {
            year: 'numeric', // 2025
            month: 'long', // Februar
            day: 'numeric' // 18
        })

        // retrieve the journal entries from storage.

        const hasJournals = localStorage.getItem('journals')
        const journalEntries = hasJournals ? JSON.parse(hasJournals) : []

        // save the journal entry to storage
        journalEntries.push(data)
        const newEntry = JSON.stringify(journalEntries)

        localStorage.setItem('journals', newEntry)
        openDialog()
        reset()
    }

    const openDialog = () => {
        // document.getElementById('success_modal').showModal()
        const modal = document.getElementById('success_modal')
        if (modal instanceof HTMLDialogElement) {
            modal.showModal()
        }
    }

    return (
        <>
            <dialog id="success_modal" className="modal">
                <div className="modal-box w-full max-w-sm p-4 md:p-6">
                    <h3 className="text-lg font-bold">Success!</h3>
                    <p className="py-4">
                        The journal entry was successfully saved!
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn w-full">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <form
                className="mx-auto flex w-full max-w-lg flex-col gap-3 p-2 md:p-4"
                onSubmit={handleSubmit(onFormSubmit)}
            >
                {/* Journal Title - now same structure as other labels */}
                <div className="flex flex-col">
                    <label
                        htmlFor="title"
                        className="form-control w-full text-sm md:text-base"
                    >
                        Journal Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="input input-bordered w-full text-sm md:text-base"
                        placeholder="Give your journal entry a nice title"
                        {...register('title')}
                    />
                    {errors.title && (
                        <span className="-mt-1 text-sm font-medium text-red-500">
                            {errors.title.message}
                        </span>
                    )}
                </div>

                {/* Emotion selection */}
                <div className="flex flex-col">
                    <label
                        htmlFor="emotions"
                        className="form-control w-full text-sm md:text-base"
                    >
                        How are you feeling today?
                    </label>
                    <select
                        id="emotions"
                        className="select select-bordered w-full text-sm md:text-base"
                        {...register('emotion')}
                    >
                        <option>Happy</option>
                        <option>Neutral</option>
                        <option>Sad</option>
                    </select>
                    {errors.emotion && (
                        <span className="-mt-1 text-sm font-medium text-red-500">
                            {errors.emotion.message}
                        </span>
                    )}
                </div>

                {/* Body textarea */}
                <div className="flex flex-col">
                    <textarea
                        className="textarea textarea-bordered mt-2 w-full text-sm md:text-base"
                        placeholder="Write something..."
                        rows={8}
                        {...register('body')}
                    ></textarea>
                    {errors.body && (
                        <span className="-mt-1 text-sm font-medium text-red-500">
                            {errors.body.message}
                        </span>
                    )}
                </div>

                <button className="btn btn-primary mt-3 w-full py-2 text-sm md:py-3 md:text-base">
                    Save Journal
                </button>
            </form>
        </>
    )
}

export default AddJournalForm
