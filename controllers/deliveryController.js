import deliverySlotModel from "../models/deliverSlotModel.js";

// Get Available Slots
const getAvailableSlots = async (req, res) => {
    const { date } = req.query;
    console.log(date);
  
    let start = new Date();
    let end = new Date();
  
    if (date) {
      start = new Date(date);
      start.setHours(0, 0, 0, 0);
      end = new Date(date);
      end.setHours(23, 59, 59, 999);
      console.log(end);
    }
  
    try {
        
      const slots = await deliverySlotModel.find({
        slotStart: { $gte: start },
        slotEnd: { $lte: end },
        $expr: { $lt: ["$currentOrders", "$maxOrders"] }
      }).sort({ slotStart: 1 });
      
      console.log(slots);
      res.json(slots);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// Create a Delivery Slot
 const createDeliverySlot = async (req, res) => {
    const { slotStart, slotEnd, maxOrders } = req.body;

    try {
        const newSlot = new deliverySlotModel({
            slotStart,
            slotEnd,
            maxOrders
        });

        const savedSlot = await newSlot.save();
        res.status(201).json(savedSlot);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Update a Delivery Slot
const updateDeliverySlot = async (req, res) => {
    const { id } = req.params;
    const { slotStart, slotEnd, maxOrders } = req.body;

    try {
        const slot = await deliverySlotModel.findById(id);
        if (!slot) return res.status(404).json({ message: 'Delivery slot not found' });

        slot.slotStart = slotStart || slot.slotStart;
        slot.slotEnd = slotEnd || slot.slotEnd;
        slot.maxOrders = maxOrders || slot.maxOrders;

        const updatedSlot = await slot.save();
        res.json(updatedSlot);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Delete a Delivery Slot
const deleteDeliverySlot = async (req, res) => {
    const { id } = req.params;

    try {
        const slot = await deliverySlotModel.findById(id);
        if (!slot) return res.status(404).json({ message: 'Delivery slot not found' });

        await slot.remove();
        res.json({ message: 'Delivery slot removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// for admin 
const getAllDeliverySlots = (async (req, res) => {
  const slots = await deliverySlotModel.find().sort({ slotStart: 1 });
  res.json(slots);
});

export { getAvailableSlots, createDeliverySlot, updateDeliverySlot, deleteDeliverySlot,getAllDeliverySlots }