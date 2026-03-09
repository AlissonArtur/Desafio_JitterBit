const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


// Criar pedido
router.post("/order", async (req, res) => {
    try {

        const data = req.body;

        // Mapping do JSON
        const order = new Order({
            orderId: data.numeroPedido,
            value: data.valorTotal,
            creationDate: new Date(data.dataCriacao),
            items: data.items.map(item => ({
                productId: Number(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        });

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Buscar pedido pelo número
router.get("/order/:orderId", async (req, res) => {

    try {

        const order = await Order.findOne({ orderId: req.params.orderId });

        if (!order) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }

        res.json(order);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Listar todos os pedidos
router.get("/order/list", async (req, res) => {

    try {

        const orders = await Order.find();
        res.json(orders);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Atualizar pedido
router.put("/order/:orderId", async (req, res) => {

    try {

        const data = req.body;

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: req.params.orderId },
            {
                orderId: data.numeroPedido,
                value: data.valorTotal,
                creationDate: new Date(data.dataCriacao),
                items: data.items.map(item => ({
                    productId: Number(item.idItem),
                    quantity: item.quantidadeItem,
                    price: item.valorItem
                }))
            },
            { new: true }
        );

        res.json(updatedOrder);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Deletar pedido
router.delete("/order/:orderId", async (req, res) => {

    try {

        await Order.findOneAndDelete({ orderId: req.params.orderId });

        res.json({ message: "Pedido deletado com sucesso" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;