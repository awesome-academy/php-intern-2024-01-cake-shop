<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\AddCakeRequest;
use App\Http\Requests\CreateCakeRequest;
use App\Models\Cake;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CakeController extends BaseApiController
{
    public function getAllCakes(Request $request)
    {
        $page = $request->page ?? 1;
        $cakes = DB::table('cakes')
            ->paginateAnother($page, config('paginate.pageSize.cakes'));

        return response()->json($cakes);
    }

    public function groupCakeByType(Request $request)
    {
        $cakes = DB::table('cakes')
            ->leftJoin('cake_types', 'type_id', '=', 'cake_types.id')
            ->leftJoin('pictures', 'pictures.cake_id', '=', 'cakes.id')
            ->get([
                'cakes.*',
                DB::raw('cake_types.name as type'),
                DB::raw('pictures.id as img_id'),
            ])
            ->unique('id')
            ->groupBy('type_id');

        return response()->json($cakes);
    }

    public function getCake(Cake $cake)
    {
        return response()->json($cake);
    }

    public function update(CreateCakeRequest $request, Cake $cake)
    {
        DB::table('cakes')->where('id', '=', $cake->id)->update([
            'name' => $request->name,
            'description' => $request->description,
            'type_id' => $request->idCakeType,
            'price' => $request->price,
            'cook_time' => $request->cookTime,
        ]);
        $cake->ingredients()->sync(json_decode($request->ingredients));

        return response()->json([
            'success' => true,
        ]);
    }

    public function addCake(AddCakeRequest $request, Cake $cake)
    {
        DB::table('cakes')->where('id', '=', $cake->id)->update([
            'amount' => $cake->amount + $request->amount,
        ]);

        return response()->json([
            'success' => true,
        ]);
    }

    public function store(CreateCakeRequest $request)
    {
        DB::table('cakes')->insert([
            'name' => $request->name,
            'description' => $request->description,
            'type_id' => $request->idCakeType,
            'price' => $request->price,
            'cook_time' => $request->cookTime,
            'amount' => 0,
        ]);

        return response()->json([
            'success' => true,
        ]);
    }

    public function destroy(Cake $cake)
    {
        $pictures = $cake->pictures;
        foreach ($pictures as $picture) {
            try {
                Storage::get($picture->link);
                Storage::delete($picture->link);
            } catch (Exception $e) {
                dd($e);
            }

            DB::table('pictures')->where('id', '=', $picture->id)->delete();
        }

        DB::table('cakes')->where('id', '=', $cake->id)->delete();

        return response()->json([
            'success' => true,
        ]);
    }
}
