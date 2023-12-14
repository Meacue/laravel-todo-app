import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import Table from "@/Components/Table.jsx";
import { useState } from 'react';
import SelectInput from '@/Components/SelectInput';
// import FilterAllTasks from '@/Components/FilterAllTasks';

const columns = [
    'title',
    'priority',
    'ending_at',
    'responsible',
    'status',
];



export default function All({ auth, tasks, userCannot}) {
// console.log(cannot['create_task']);

    // const [currentTasks, setTasks] = useState([
    //     {data: }
    // ])

    const currentTasks = tasks;

    const filterOptions = [
        'без группировок',
        'на сегодня',
        'на неделю',
        'на будущее',
        'по ответственным',
    ];

    // const [filteredTasks, setTasks] = useState({
    //     filteredTasks: tasks.all,
    // })

    // console.log(currentTasks);
    

    // function setFilters(filter) {
    //     console.log(tasks);
    // }

    // function chooseFilter(filter) {
    //     console.log(filter);
    //     setState()
    //     filteredTasks: tasks.filter(el => el.filter === tasks.status)
    // }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Tasks</h2>}
        >
            <Head title="All Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4 ">
                    {/* <div class="alert alert-danger">
                            {}
                    </div> */}

                    <Link className=" px-6 py-2 text-white bg-green-500 rounded-md" href={ route("tasks.create")} hidden={userCannot['create_task']} >Create Task</Link>
                    {/* <SelectInput    
                        // id="responsible"
                        className="mt-1 block w-full"
                        options={filterOptions}
                        // value={}
                        onChange={(e) => setFilters(e.target.value)}
                        // disabled={userCannot['update_full_task']}
                    /> */}

                    {/* <FilterAllTasks chooseFilter={chooseFilter}/> */}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table items={tasks} columns={columns}  primary="User task" action="tasks.edit"></Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}