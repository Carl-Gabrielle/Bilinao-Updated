import React from 'react';

const SellerNotification = ({ order, products }) => {
    return (
        <div className="notification-page">
            <h1>New Order Notification</h1>
            <p><strong>Order ID:</strong> {order.order_number}</p>
            <p><strong>Customer Name:</strong> {order.name}</p>
            <p><strong>Total Amount:</strong> PHP {order.amount}</p>
            <p><strong>Shipping Address:</strong> {order.shipping_address}</p>

            <h2>Ordered Products:</h2>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        <strong>{product.product_name}</strong> - Quantity: {product.qty} - Price: PHP {product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SellerNotification;
