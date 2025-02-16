"use client"

export default function Orders() {
    const orders = [
        { id: 1, orderNumber: "ORD-001", orderDate: "2022-01-01", customerName: "John Doe", total: 100, status: "Pending" },
        { id: 2, orderNumber: "ORD-002", orderDate: "2022-01-02", customerName: "Jane Doe", total: 150, status: "Delivered" },
        { id: 3, orderNumber: "ORD-003", orderDate: "2022-01-03", customerName: "Alice", total: 200, status: "Pending" },
    ]

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mt-8 mb-6">Orders</h1>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                                        ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}