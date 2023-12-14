import AuthenticatedLayout from  '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CreateTaskForm from './Partials/CreateTaskForm';

export default function Create({ auth, responsibleUsers }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create new task</h2>}
        >
            <Head title="Create new task"/>
            <div className='py-12'>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <CreateTaskForm responsibleUsers={responsibleUsers} className="max-w-xl"></CreateTaskForm>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}