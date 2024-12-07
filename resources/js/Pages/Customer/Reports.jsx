import React from 'react';

export default function ReportIndex({ reports }) {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-xl font-semibold mb-4">Reported Products</h1>
            <div className="bg-white rounded shadow p-4">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b px-4 py-2 text-left">Product Name</th>
                            <th className="border-b px-4 py-2 text-left">Seller Name</th>
                            <th className="border-b px-4 py-2 text-left">Reason</th>
                            <th className="border-b px-4 py-2 text-left">Details</th>
                            <th className="border-b px-4 py-2 text-left">Reported At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id}>
                                <td className="border-b px-4 py-2">
                                    {report.product?.name || 'Product Deleted'}
                                </td>
                                <td className="border-b px-4 py-2">
                                    {report.product?.seller?.name || 'Seller Not Found'}
                                </td>
                                <td className="border-b px-4 py-2">{report.reason}</td>
                                <td className="border-b px-4 py-2">
                                    {report.details || 'N/A'}
                                </td>
                                <td className="border-b px-4 py-2">
                                    {new Date(report.created_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
