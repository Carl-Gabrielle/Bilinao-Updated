<?php

namespace App\Http\Controllers;
use App\Models\MonthlySalesReport;
use App\Models\DailySalesReport;
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
    
        $totalContribution = MonthlySalesReport::where('month_date', $firstDayOfTheMonth)
            ->sum('total_contribution');
    
        return Inertia('Admin/Sales/SalesReport', [
            'monthlySalesReport' => $monthlySalesReport,
            'totalContributionForCurrentMonth' => $totalContribution
        ]);
    }
    public function salesReportIndividual(Request $request)
    {
        $selectedMonthySalesReport = DailySalesReport::where('monthly_sales_report_id', $request->id)
            ->with(['orderItems.product', 'seller'])
            ->orderBy('updated_at', 'asc')
            ->get();

        $totalContribution = $selectedMonthySalesReport
            ->sum('contribution');

        return Inertia('Admin/Sales/SellerIndividualSales', [
            'data' => $selectedMonthySalesReport,
            'totalContribution' => $totalContribution
        ]);
    }
    public function toggleStatus($id, Request $request)
{
    $salesReport = DailySalesReport::find($id);

    if ($salesReport && $request->input('status') === 'Paid') {
        $salesReport->status = 'Paid';
        $salesReport->save();

        return redirect()->route('admin.salesReportIndividual', ['id' => $salesReport->monthly_sales_report_id]);
    }

    return response()->json(['error' => 'Invalid operation'], 400);
}

    


}
