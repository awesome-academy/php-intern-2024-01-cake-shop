<?php

namespace App\Repositories;

use Closure;

interface BaseRepository
{
    public function find(string $id);

    public function create(array $attributes);

    public function update(string $id, array $attributes);

    public function delete(string $id);

    public function getAll();

    public function paginate(int $pageSize);

    public function where(Closure $condition);
}
