import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput.jsx";
import { Transition } from "@headlessui/react";
import TextArea from "@/Components/TextArea";

export default function CreateTaskForm ({ responsibleUsers, className = '' }) {

    // const today = new Date().toLocaleDateString();

    const submit = (e) => {
        e.preventDefault();

        post(route('tasks.store'), {
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

    Object.values(responsibleUsers).forEach(userName => {
        responsibleUsersOptions.push(userName);
    });

    const { data, setData, post, errors } = useForm({
        title: "",
        description: "",
        priority: priorityOptions[0],
        ending_at: "",
        responsible: responsibleUsersOptions[0],
        status: statusOptions[0],
    });

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Task Information</h2>

                <p className="mt-1 text-sm text-gray-600 ">
                    Create a task for your subordinate employee.
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
                    />

                    <InputError className="mt-2" message={errors.status} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton>Create Task</PrimaryButton>
                </div>

            </form>
        </section>
    );
}