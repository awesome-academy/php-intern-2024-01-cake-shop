<?php

namespace App\Http\Controllers;

use App\Models\Cake;
use Inertia\Inertia;

class CakeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cakes = Cake::paginate(config('paginate.pageSize.cakes'));

        return Inertia::render('Cake/ListCakes', compact('cakes')); //phpcs:ignore
    }

    public function adminIndex()
    {
        $cakes = Cake::paginate(config('paginate.pageSize.cakes'));

        return Inertia::render('Admin/ListCakes', compact('cakes')); //phpcs:ignore
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Cake/Create');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cake  $cake
     * @return \Illuminate\Http\Response
     */
    public function show(Cake $cake)
    {
        $cake->load(['type', 'pictures', 'ingredients']);

        return Inertia::render('Cake/Details', compact('cake')); //phpcs:ignore
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cake  $cake
     * @return \Illuminate\Http\Response
     */
    public function edit(Cake $cake)
    {
        $cake->load(['pictures', 'ingredients']);

        return Inertia::render('Cake/Edit', compact('cake')); //phpcs:ignore
    }
}
