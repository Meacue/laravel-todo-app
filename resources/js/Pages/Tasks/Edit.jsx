import AuthenticatedLayout from  '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateTaskForm from './Partials/UpdateTaskForm';

export default function Edit({ auth, task, responsibleUsers, userCannot }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task #{task.id}</h2>}
        >
            <Head title={'Task #' + task.id}/>
            <div className='py-12'>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateTaskForm task={task} responsibleUsers={responsibleUsers} userCannot={userCannot} className="max-w-xl"></UpdateTaskForm>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}