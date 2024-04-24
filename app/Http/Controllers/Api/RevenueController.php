<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\GetRevenueRequest;
use App\Repositories\Order\OrderRepository;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class RevenueController extends BaseApiController
{
    protected OrderRepository $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function index(GetRevenueRequest $request)
    {
        $now = new Carbon();
        if ($request->month) {
            $now->setMonth($request->month);
        }

        if ($request->year) {
            $now->setYear($request->year);
        }

        $totalOrders = $this->orderRepository->where(function ($query) use ($now) {
            return $query->where(DB::raw('YEAR(created_at)'), '=', $now->year);
        })->get();
        dd($totalOrders);
        $ordersPerMonth = $totalOrders->groupBy(function ($order) {
            return $order->created_at->format('m/Y');
        });
        $orders = $totalOrders->where('status_id', '!=', config('statuses.buying'))
            ->whereNotNull('finished_at')
            ->filter(function ($order) use ($now) {
                $dayStart = new Carbon($now->startOfDay()->startOfMonth());
                $dayEnd = $now->endOfDay()->endOfMonth();

                return $order->finished_at->gte($dayStart) && $order->finished_at->lte($dayEnd);
            })
            ->load('details', 'details.cake:id,price', 'user:id,name')
            ->each(function ($order) {
                $total = 0;
                $order->details->each(function ($detail) use (&$total) {
                    $total += $detail->amount * $detail->cake->price;
                });
                $order->{'total'} = $total;
            });

        return response()->json([
            'success' => true,
            'ordersPerMonth' => $ordersPerMonth->toArray(),
            'orders' => $orders->toArray(),
        ]);
    }

    public function gatewayGetTotalRevenue(GetRevenueRequest $request, string $picker)
    {
        switch ($picker) {
            case 'month':
                return $this->getTotalAmountPerMonth($request);
            case 'quarter':
                return $this->getTotalAmountPerQuarter($request);
            case 'year':
                return $this->getTotalAmountPerYear($request);
            default:
                return response()->json([
                    'success' => false,
                    'picker' => 'picker invalid value',
                ]);
        }
    }

    public function getTotalAmountPerMonth(GetRevenueRequest $request)
    {
        $start = new Carbon();
        $end = new Carbon();
        if ($request->startMonth) {
            $start->setMonth($request->startMonth);
        }

        if ($request->startYear) {
            $start->setYear($request->startYear);
        }

        if ($request->endMonth) {
            $end->setMonth($request->endMonth);
        }

        if ($request->endYear) {
            $end->setYear($request->endYear);
        }

        $start->startOfDay()->startOfMonth();
        $end->endOfDay()->endOfMonth();
        $totals = new Collection();

        $orders = $this->orderRepository->where(function ($query) use ($start, $end) {
            return $query->where('finished_at', '>=', $start)
                ->where('finished_at', '<=', $end);
        })
            ->with('details', 'details.cake:id,price', 'user:id,name')
            ->orderBy('finished_at')
            ->get()
            ->each(function ($order) {
                $total = 0;
                $order->details->each(function ($detail) use (&$total) {
                    $total += $detail->amount * $detail->cake->price;
                });
                $order->{'total'} = $total;
            })
            ->groupBy(function ($order) {
                return $order->finished_at->format('m/Y');
            })
            ->each(function ($ordersPerMonth) use (&$totals) {
                $total = 0;
                $ordersPerMonth->each(function ($order) use (&$total) {
                    $total += $order->total;
                });
                $totals->add($total);
            });
        $totals = $totals->reverse();
        $resTotals = [];
        $resLabels = [];
        for ($i = new Carbon($start); $i <= $end; $i->addMonth()) {
            if ($orders->has($i->format('m/Y'))) {
                array_push($resTotals, $totals->pop());
            } else {
                array_push($resTotals, 0);
            }

            array_push($resLabels, $i->format('m/Y'));
        }

        return response()->json([
            'success' => true,
            'totals' => $resTotals,
            'labels' => $resLabels,
        ]);
    }

    public function getTotalAmountPerYear(GetRevenueRequest $request)
    {
        $start = new Carbon();
        $end = new Carbon();

        if ($request->startYear) {
            $start->setYear($request->startYear);
        }

        if ($request->endYear) {
            $end->setYear($request->endYear);
        }

        $start->startOfYear();
        $end->endOfYear();
        $totals = new Collection();

        $orders = $this->orderRepository->where(function ($query) use ($start, $end) {
            return $query->where('finished_at', '>=', $start)
                ->where('finished_at', '<=', $end);
        })
            ->with('details', 'details.cake:id,price', 'user:id,name')
            ->orderBy('finished_at')
            ->get()
            ->each(function ($order) {
                $total = 0;
                $order->details->each(function ($detail) use (&$total) {
                    $total += $detail->amount * $detail->cake->price;
                });
                $order->{'total'} = $total;
            })
            ->groupBy(function ($order) {
                return $order->finished_at->format('Y');
            })
            ->each(function ($ordersPerMonth) use (&$totals) {
                $total = 0;
                $ordersPerMonth->each(function ($order) use (&$total) {
                    $total += $order->total;
                });
                $totals->add($total);
            });
        $totals = $totals->reverse();
        $resTotals = [];
        $resLabels = [];
        for ($i = new Carbon($start); $i <= $end; $i->addYear()) {
            if ($orders->has($i->format('Y'))) {
                array_push($resTotals, $totals->pop());
            } else {
                array_push($resTotals, 0);
            }

            array_push($resLabels, $i->format('Y'));
        }

        return response()->json([
            'success' => true,
            'totals' => $resTotals,
            'labels' => $resLabels,
        ]);
    }

    public function getTotalAmountPerQuarter(GetRevenueRequest $request)
    {
        $start = new Carbon();
        $end = new Carbon();
        if ($request->startMonth) {
            $start->setMonth($request->startMonth);
        }

        if ($request->startYear) {
            $start->setYear($request->startYear);
        }

        if ($request->endMonth) {
            $end->setMonth($request->endMonth);
        }

        if ($request->endYear) {
            $end->setYear($request->endYear);
        }

        $start->startOfQuarter();
        $end->endOfQuarter();
        $totals = new Collection();
        $orders = $this->orderRepository->where(function ($query) use ($start, $end) {
            return $query->where(DB::raw('QUARTER(finished_at)'), '>=', $start->quarter)
                ->where(DB::raw('QUARTER(finished_at)'), '<=', $end->quarter);
        })->with('details', 'details.cake:id,price', 'user:id,name')
            ->orderBy('finished_at')
            ->get()
            ->each(function ($order) {
                $total = 0;
                $order->details->each(function ($detail) use (&$total) {
                    $total += $detail->amount * $detail->cake->price;
                });
                $order->{'total'} = $total;
            })
            ->groupBy(function ($order) {
                return $order->finished_at->quarter . '/' . $order->finished_at->format('Y');
            })
            ->each(function ($ordersPerMonth) use (&$totals) {
                $total = 0;
                $ordersPerMonth->each(function ($order) use (&$total) {
                    $total += $order->total;
                });
                $totals->add($total);
            });
        $totals = $totals->reverse();
        $resTotals = [];
        $resLabels = [];
        for ($i = new Carbon($start); $i <= $end; $i->addMonths(3)) {
            if ($orders->has($i->quarter . '/' . $i->year)) {
                array_push($resTotals, $totals->pop());
            } else {
                array_push($resTotals, 0);
            }

            array_push($resLabels, $i->year . '-Q' . $i->quarter);
        }

        return response()->json([
            'success' => true,
            'totals' => $resTotals,
            'labels' => $resLabels,
        ]);
    }
}
