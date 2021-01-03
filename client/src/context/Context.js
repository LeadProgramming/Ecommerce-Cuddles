import { createContext } from "react";
export const UserContext = createContext({
    account: "guest",
    user: "",
    accInfo: {},
    changeAccInfo: () => { }
});

export const CartContext = createContext({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { }
});

export const ItemsContext = createContext({
    items: [],
    createItem: () => { },
    updateItem: () => { },
    deleteItem: () => { }
});



export const OrdersContext = createContext({
    orders: {

    },
    refundOrder: () => { }
});
