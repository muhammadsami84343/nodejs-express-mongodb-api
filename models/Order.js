const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product reference is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  priceAtTimeOfOrder: {
    type: Number,
    required: [true, 'Price at time of order is required'],
    min: [0, 'Price cannot be negative']
  }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  items: {
    type: [orderItemSchema],
    validate: {
      validator: function(items) {
        return items && items.length > 0;
      },
      message: 'Order must contain at least one item'
    }
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    minlength: [1, 'Customer name cannot be empty'],
    maxlength: [200, 'Customer name cannot exceed 200 characters']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
