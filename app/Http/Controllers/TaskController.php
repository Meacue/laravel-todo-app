<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller
{
    public function index(): Response
    {
        $tasks = Task::all();

        return Inertia::render('Tasks/All', [
            'tasks' => $tasks,
            'userCannot' => [
                'create_task' => Auth::user()->cannot('create', Task::class),
            ],
        ]);
        
    }

    public function edit(Task $task): Response
    {
        $responsibleUsers =  $this->getResponsibleUsers();

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'responsibleUsers' => $responsibleUsers,
            'userCannot' => [
                'delete_task' => Auth::user()->cannot('delete', $task),
                'update_full_task' => Auth::user()->cannot('updateFullTask', $task),
                'update_status' => Auth::user()->cannot('updateStatus', $task),
            ],
        ]);
    }

    public function create(Request $request): Response
    {
        $responsibleUsers =  $this->getResponsibleUsers();

        if ($request->user()->cannot('create', Task::class)) {
            abort(403);
        }

        return Inertia::render('Tasks/Create', [
            'responsibleUsers' => $responsibleUsers,
        ]);
    }

    public function show (Task $task)
    {
        return Inertia::render('Tasks/Show', compact('task'));
    }

    public function store(Request $request): RedirectResponse
    {
        $responsible_id = $this->getResponsibleUserId($request);

        $user = Auth::user();
        
        // $this->authorize('create', $user);
        // с этой строчкой не дает создать модель руководителю, почему то...

        $data = Validator::make($request->all(), [
            
                    //inputs..
        
                    'title' => 'required',
                    'description' => 'required',
                    'ending_at' => 'required',
                    'priority' => 'required',
                    'status' => 'required',
    
                ])->validate();

        $data['responsible_id'] = $responsible_id;
        $data['creator_id'] = $user->id;

        Task::create($data);

        return redirect()->route('tasks.index')->with('success', 'Task created successfully');

    }

    public function update (Task $task, Request $request ): void
    {   
        $responsible_id = $this->getResponsibleUserId($request);
    
        $user = Auth::user();
        $this->authorize('update', $task);
        
        if ($user->supervisor_id === NULL) {
            $task->update([
                'title' => $request->title,
                'description' => $request->description,
                'ending_at' => $request->ending_at,
                'responsible_id' => $responsible_id, 
                'priority' => $request->priority,
                'status' => $request->status,
            ]);
        } else {
            
            $task->update([
                'status' => $request->status,
            ]);
        }
        
    }

    public function destroy (Task $task): RedirectResponse
    {   
        // $user = Auth::user();
        $this->authorize('delete', $task);

        // if ($request->user()->cannot('delete', [$user, $task])) {
        //     abort(403);
        // }

        // if (auth()->user()->can('update', $task)) {
        //     //user is authorized to perform this action
        // }

        $task->delete();
        return redirect()->route('tasks.index');
        $this->session()->flash('success', 'Task deleted successfully');
    }

    private function getResponsibleUsers (): Array
    {
        $queryResponsibleUsers = DB::select('select name, surname, lastname from users where supervisor_id = ?', [Auth::user()->id]);
        $responsibleUsers =  [];

        foreach ($queryResponsibleUsers as $responsibleUser) {
            $responsibleUsers[] = $responsibleUser->surname." ".$responsibleUser->name." ".$responsibleUser->lastname;
        }

        return $responsibleUsers;
    }

    private function getResponsibleUserId ($request): Int
    {
        $responsibleFIO = explode(" ", $request->responsible);

        $responsible_id = DB::table('users')
                                        ->where('surname', $responsibleFIO[0]) 
                                        ->where('name', $responsibleFIO[1])
                                        ->where('lastname', $responsibleFIO[2]) 
                                        ->value('id');

        return $responsible_id;
    }
}
