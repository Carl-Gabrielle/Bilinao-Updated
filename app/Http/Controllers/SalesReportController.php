<?php

namespace App\Http\Controllers;
use App\Models\MonthlySalesReport;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SalesReportController extends Controller
{
    public function salesReport()
    {
        $firstDayOfTheMonth = Carbon::now()->startOfMonth()->toDateString();

        $monthlySalesReport = MonthlySalesReport::where('month_date', $firstDayOfTheMonth)
            ->with('seller')
            ->get();

        return Inertia('Admin/Sales/SalesReport', [
            'monthlySalesReport' => $monthlySalesReport
        ]);
    }
    public function salesReportIndividual()
    {


        return Inertia('Admin/Sales/SellerIndividualSales', [

        ]);
    }


}
