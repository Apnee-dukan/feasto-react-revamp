// src/pages/Cart.tsx
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';

export default function Cart() {
  const { items, updateQty, removeItem, clearCart, total } = useCart();

  if (items.length === 0) {
    return <div className="min-h-screen flex flex-col items-center justify-center">Your cart is empty.</div>
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {items.map(item => (
        <div key={item.id} className="flex items-center justify-between bg-white border rounded p-4 mb-4">
          <div className="flex items-center space-x-4">
            {item.img && <img src={item.img} className="w-16 h-16 object-cover rounded" />}
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => updateQty(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="px-2">–</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2">+</button>
            <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500"><X /></button>
          </div>
        </div>
      ))}

      <div className="text-right font-semibold text-xl mb-4">Total: ${total().toFixed(2)}</div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => clearCart()}>Clear Cart</Button>
        <Button>Proceed to Checkout</Button>
      </div>
    </div>
  );
}
