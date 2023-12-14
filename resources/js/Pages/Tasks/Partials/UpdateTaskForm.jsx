import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage} from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput.jsx";
import { Transition } from "@headlessui/react";
import TextArea from "@/Components/TextArea";
import DeleteButton from "@/Components/DeleteButton";
import { router } from '@inertiajs/react'


export default function UpdateTaskForm ({ task, responsibleUsers, userCannot, className = '' }) {

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        title: task.title,
        description: task.description,
        priority: task.priority,
        ending_at: task.ending_at,
        responsible: task.responsible,
        status: task.status,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('tasks.update', task.id), {
            preserveScroll: true
        });
    };

    const statusOptions = [
        'выполнена',
        'выполняется',
        'к выполнению',
        'отменена'
    ];

    const priorityOptions = [
        'высокий',
        'средний',
        'низкий'
    ];
    
    const responsibleUsersOptions = [];

    // responsibleUsersOptions.push(task.responsible)

    if (userCannot['update_full_task']) {
        responsibleUsersOptions.push(data.responsible)
    }

    Object.values(responsibleUsers).forEach(userName => {
        responsibleUsersOptions.push(userName);
    });

    function destroy() {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('tasks.destroy', task.id));
        }
    }

    // console.log(userCannot['update_full_task']);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Task Information</h2>

                <p className="mt-1 text-sm text-gray-600 ">
                    Update your task information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="title" value="Title"/>

                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        disabled={userCannot['update_full_task']}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description"/>

                    <TextArea
                        id="description"
                        className="mt-1 block w-full"
                        value={data.description}
                        rows="4"
                        onChange={(e) => setData('description', e.target.value)}
                        disabled={userCannot['update_full_task']}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="priority" value="Priority"/>

                    <SelectInput
                        id="priority"
                        className="mt-1 block w-full"
                        options={priorityOptions}
                        value={data.priority}
                        onChange={(e) => setData('priority', e.target.value)}
                        disabled={userCannot['update_full_task']}
                    />
                </div>
        
                <div>
                    <InputLabel htmlFor="ending_at" value="Ending at"/>

                    <TextInput
                        id="ending_at"
                        className="mt-1 block w-full"
                        value={data.ending_at}
                        onChange={(e) => setData('ending_at', e.target.value)}
                        type="date"
                        disabled={userCannot['update_full_task']}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="responsible" value="Responsible"/>

                    <SelectInput
                        id="responsible"
                        className="mt-1 block w-full"
                        options={responsibleUsersOptions}
                        value={data.responsible}
                        onChange={(e) => setData('responsible', e.target.value)}
                        disabled={userCannot['update_full_task']}
                    />
                </div>
                

                <div>
                    <InputLabel htmlFor="status" value="Status"/>

                    <SelectInput
                        id="status"
                        className="mt-1 block w-full"
                        options={statusOptions}
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        // disabled
                        disabled={userCannot['update_status']}
                    />

                    <InputError className="mt-2" message={errors.status} />
                </div>

                <div className="flex justify-between ">

                    <PrimaryButton disabled={processing}>Save Changes</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterForm="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>

                    <DeleteButton onDelete={destroy} cannotDelete={userCannot['delete_task']}>Delete Task</DeleteButton>
                </div>

            </form>
        </section>
    );
}