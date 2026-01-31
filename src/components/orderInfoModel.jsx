export default function OrderDetailsModal({
  isModelOpen,
  selectedOrder,
  closeModel,
  refresh,
}) {
  if (!isModelOpen || !selectedOrder) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="w-[700px] max-h-[90vh] bg-primary rounded-2xl p-6 shadow-xl overflow-y-auto flex flex-col gap-5">

        {/* Header */}
        <div className="flex justify-between items-center border-b border-accent/40 pb-3">
          <h2 className="text-xl font-semibold text-secondary">
            Order Details
          </h2>
          <button
            onClick={closeModel}
            className="text-secondary text-lg hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Order Meta */}
        <div className="grid grid-cols-2 gap-4 text-sm text-secondary">
          <p><span className="font-semibold">Order ID:</span> {selectedOrder.orderId}</p>
          <p><span className="font-semibold">Date:</span> {new Date(selectedOrder.date).toLocaleString()}</p>
          <p>
            <span className="font-semibold">Status:</span>
            <span className="ml-2 px-3 py-1 rounded-full bg-accent/40 text-xs font-medium">
              {selectedOrder.status}
            </span>
          </p>
          <p><span className="font-semibold">Total:</span> LKR {selectedOrder.total.toFixed(2)}</p>
        </div>

        {/* Customer Info */}
        <div className="bg-white border border-accent/40 rounded-xl p-4">
          <h3 className="font-semibold text-secondary mb-2">
            Customer Information
          </h3>
          <div className="text-sm text-secondary space-y-1">
            <p><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
            <p><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
            <p><span className="font-medium">Phone:</span> {selectedOrder.phone}</p>
            <p><span className="font-medium">Address:</span> {selectedOrder.customerAddress}</p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white border border-accent/40 rounded-xl p-4">
          <h3 className="font-semibold text-secondary mb-3">
            Items ({selectedOrder.items.length})
          </h3>

          <div className="flex flex-col gap-3">
            {selectedOrder.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-accent/30 pb-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg border"
                />

                <div className="flex-1 text-sm text-secondary">
                  <p className="font-medium">{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                </div>

                <div className="text-sm font-medium text-secondary">
                  LKR {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={closeModel}
            className="px-5 py-2 rounded-lg border border-accent text-secondary hover:bg-accent/20 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
