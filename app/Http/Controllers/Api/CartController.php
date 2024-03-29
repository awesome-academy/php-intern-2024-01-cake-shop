<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddItemToCartRequest;
use App\Http\Requests\ConfirmOrderRequest;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)
            ->where('status_id', config('statuses.buying'))
            ->first();
        if (!$order) {
            $order = new Order();
            $order->user_id = $user->id;
            $order->shipping_address = $user->address;
            $order->shipping_phone = $user->phone;
            $order->status_id = config('statuses.buying');
            $order->save();
        }

        $order->load(['details', 'details.cake', 'details.cake.pictures']);

        return response()->json($order);
    }

    public function deleteItem(Order $order, OrderDetail $orderDetail)
    {
        if ($orderDetail->order_id === $order->id) {
            $orderDetail->delete();

            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false]);
    }

    public function addItem(AddItemToCartRequest $request)
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)->where('status_id', config('statuses.buying'))->first();
        $details = $order->details;
        foreach ($details as $e) {
            if ($e->cake_id === $request->cakeId) {
                $e->amount++;
                $e->save();

                return response()->json(['success' => true]);
            }
        }

        $orderDetail = new OrderDetail([
            'order_id' => $order->id,
            'cake_id' => $request->cakeId,
            'amount' => $request->amount,
        ]);

        $orderDetail->save();

        return response()->json(['success' => true], Response::HTTP_CREATED);
    }

    public function buy(ConfirmOrderRequest $request, Order $order)
    {
        $details = (array) json_decode($request->details);

        foreach ($details as $key => $value) {
            OrderDetail::where('id', $key)->update([
                'amount' => $value,
            ]);
        }

        $order->shipping_address = $request->shipping_address;
        $order->shipping_phone = $request->shipping_phone;
        $order->note = $request->note;
        $order->status_id = config('statuses.pending');
        $order->save();

        return response()->json([
            'success' => true,
        ], 200);
    }
}
