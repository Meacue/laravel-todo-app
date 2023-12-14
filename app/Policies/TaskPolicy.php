<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\Response;

use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Database\Eloquent\Model;

class TaskPolicy
{
    // public function before(User $user, $ability) 
    // {
    //     if ($user->supervisor_id === NULL) {
    //         return true;
    //     }
    // }
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Task $task): bool
    {
        // return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //

        // $ability = !empty($user) && $user->can("update-attr-$key-" . static::class);

        // return $ability;

        return $user->supervisor_id === NULL;

        // return $user->can('create-' . $this->getModelClass());
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Task $task): bool
    {
        //
        if ($user->id === $task->creator_id || $user->id === $task->responsible_id) {
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Task $task): bool
    {
        //
        return $user->id === $task->creator_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Task $task): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Task $task): bool
    {
        //
        // return true;
    }

    public function updateFullTask(User $user, Task $task): bool
    {

        if ($user->supervisor_id === NULL) {
            if ($user->id === $task->creator_id) {
                return true;
            }
        } else {
            if ($user->id === $task->responsible_id) {
                return false;
            }
        }
        return false;
        // if ($user->supervisor_id === NULL && $user->id === $task->creator_id) {
        //     return true;
        // }
        // return false;
        // return $user->supervisor_id === NULL;
    }

    public function updateStatus(User $user, Task $task): bool
    {
        if ($user->id === $task->creator_id || $user->id === $task->responsible_id) {
            return true;
        }
        return false;
    }
}
