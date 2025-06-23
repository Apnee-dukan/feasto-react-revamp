import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-primary">
        Cancellation & Refund Policy
      </h1>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-primary">Cancellation</h2>
      <p className="mb-4">
        As a general rule you shall not be entitled to cancel your order once you have received confirmation of the same. If you cancel your order after it has been confirmed, Feasto shall have a right to charge you a cancellation fee of up to the order value, with a right to either not refund the order value or recover from your subsequent order, the complete/deficit cancellation fee, as applicable, to compensate our restaurant partners. Feasto shall also have the right to charge you a cancellation fee for the orders cancelled by Feasto for the reasons specified under clause 1(iii) of this cancellation and refunds policy. In case of cancellations for reasons attributable to Feasto or its restaurant partners, Feasto shall not charge you any cancellation fee.
      </p>

      <p className="mb-4">
        However, in the unlikely event of an item on your order being unavailable, we will contact you on the phone number provided to us at the time of placing the order and inform you of such unavailability. In such an event, you will be entitled to cancel the entire order and shall be entitled to a refund in accordance with our refund policy.
      </p>

      <p className="mb-4">
        We reserve the sole right to cancel your order in the following circumstances:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>The designated address falls outside the delivery zone offered by us</li>
        <li>Failure to contact you by phone or email at the time of confirming the order booking</li>
        <li>Failure to deliver your order due to lack of information, direction or authorization from you at the time of delivery</li>
        <li>Unavailability of all the items ordered by you at the time of booking the order</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-primary">Refunds</h2>
      <p className="mb-4">
        You shall be entitled to a refund only if you pre-pay for your order at the time of placing your order on the Platform and only in the event of any of the following circumstances:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Your order packaging has been tampered or damaged at the time of delivery</li>
        <li>Feasto cancels your order due to:
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Your delivery location falling outside our designated delivery zones</li>
            <li>Failure to contact you by phone or email at the time of confirming the order booking</li>
          </ul>
        </li>
        <li>You cancel the order at the time of confirmation due to unavailability of the items you ordered</li>
      </ul>

      <p className="mb-4">
        Our decision on refunds shall be at our sole discretion and shall be final and binding.
      </p>

      <p className="mb-4">
        All refund amounts shall be credited to your account within 3–4 business days in accordance with the terms that may be stipulated by the bank which has issued the credit/debit card.
      </p>

      <p className="mb-4">
        In case of payment at the time of delivery, you will not be required to pay for:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Orders where the packaging has been tampered or damaged by us</li>
        <li>Wrong order being delivered</li>
        <li>Items missing from your order at the time of delivery</li>
      </ul>
    </div>
  );
};

export default ReturnPolicy;
