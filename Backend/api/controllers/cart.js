const Cart = require('../models/cart');

class CartFunc {
    static async addItemToCart(req, res) {
        const { id_article, id_size, quantity } = req.body;
        const id_user = req.user.id;

        try {
            const cartId = await Cart.addItemToCart(id_user, id_article, id_size, quantity);
            return res.status(200).json({
                message: `Item added to cart successfully`,
                status: 200,
                cartId: cartId
            });
        } catch (err) {
            return res.status(500).json({
                message: `Error adding item to cart: ${err.message}`,
                status: 500
            });
        }
    }

    static async updateItemSize(req, res) {
        const { id_cart, newSize } = req.body;

        try {
            await Cart.updateItemSize(id_cart, newSize);
            return res.status(200).json({
                message: `Item size updated successfully`,
                status: 200
            });
        } catch (err) {
            return res.status(500).json({
                message: `Error updating item size: ${err.message}`,
                status: 500
            });
        }
    }

    static async updateItemQuantity(req, res) {
        const { id_cart, newQuantity } = req.body;

        try {
            await Cart.updateItemQuantity(id_cart, newQuantity);
            return res.status(200).json({
                message: `Item quantity updated successfully`,
                status: 200
            });
        } catch (err) {
            return res.status(500).json({
                message: `Error updating item quantity: ${err.message}`,
                status: 500
            });
        }
    }

    static async removeItemFromCart(req, res) {
        const { id_cart } = req.body;

        try {
            await Cart.removeItemFromCart(id_cart);
            return res.status(200).json({
                message: `Item removed from cart successfully`,
                status: 200
            });
        } catch (err) {
            return res.status(500).json({
                message: `Error removing item from cart: ${err.message}`,
                status: 500
            });
        }
    }

    static async getUserCart(req, res) {
        const id_user = req.user.id; // Assuming the user ID is stored in req.user

        try {
            const cartItems = await Cart.getUserCart(id_user);
            if (!cartItems || cartItems.length === 0) {
                return res.status(404).json({
                    message: `Cart is empty`,
                    status: 404
                });
            } else {
                return res.status(200).json({
                    message: `Cart items retrieved successfully`,
                    status: 200,
                    cart: cartItems
                });
            }
        } catch (err) {
            return res.status(500).json({
                message: `Error retrieving cart items: ${err.message}`,
                status: 500
            });
        }
    }
}

module.exports = CartFunc;