<?php

namespace App\Repositories;

use Closure;

abstract class EloquentBaseRepository implements BaseRepository
{
    /** @var \Illuminate\Database\Eloquent\Model */
    protected $model;

    public function __construct()
    {
        $this->setModel();
    }

    /**
     * get model
     * @return string
     */
    abstract public function getModel();

    /**
     * Set model
     */
    public function setModel()
    {
        $this->model = app()->make(
            $this->getModel()
        );
    }

    /**
     * Get All
     * @param array $attributes
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAll(array $attributes = ['*'])
    {
        return $this->model->all($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    /**
     * Create
     * @param array $attributes
     * @return mixed
     */
    public function create(array $attributes)
    {
        return $this->model->create($attributes);
    }

    /**
     * Update
     * @param string $id
     * @param array $attributes
     * @return bool|mixed
     */
    public function update(string $id, array $attributes)
    {
        $result = $this->model->find($id);
        if ($result) {
            $result->update($attributes);

            return $result;
        }

        return false;
    }

    /**
     * Delete
     *
     * @param string $id
     * @return bool
     */
    public function delete(string $id)
    {
        $result = $this->model->find($id);
        if ($result) {
            $result->delete();

            return true;
        }

        return false;
    }

    public function paginate(int $pageSize)
    {
        return $this->model->paginate($pageSize);
    }

    public function where(Closure $condition)
    {
        return $this->model->where($condition);
    }
}
