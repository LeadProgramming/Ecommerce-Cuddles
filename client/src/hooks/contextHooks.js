import React, { useState } from "react";
export function useUserContext() {
    const [account, setAccount] = useState("guest");
    const [user, setUser] = useState("");
    const [pw, setPw] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    return { account, setAccount, user, setUser };
}

export function useCartContext() {
    const [cart, setCart] = useState([]);
    const addToCart = (itm) => {
        setCart((crt) => crt.concat(itm));
    }
    const removeFromCart = (i) => {
        setCart((crt) => crt.filter((itm, idx) => idx != i));
    }
    const clearCart = () => {
        setCart([]);
    }
    return { cart, setCart, addToCart, removeFromCart, clearCart }
}

export function useItemsContext() {
    const [items, setItems] = useState([]);
    const createItem = ({ ...i }) => {
        const { name: ItemName, price: ItemPrice, quantity: ItemQuantity, description: ItemDescription, image: ItemImage } = i.state;
        setItems(currList => currList.concat({ ItemID: i.idGenerator, ItemName, ItemPrice, ItemQuantity, ItemDescription, ItemImage }));
    }
    const updateItem = ({ ...i }) => {
        const { name: ItemName, price: ItemPrice, quantity: ItemQuantity, description: ItemDescription, image: ItemImage } = i.state;
        const { ItemID } = i.props;
        let idx = items.map(e => e.ItemID).indexOf(i.props.ItemID);
        items.splice(idx, 1, { ItemID, ItemName, ItemPrice, ItemQuantity, ItemDescription, ItemImage });
        setItems(items);
    }
    const deleteItem = (i) => {
        setItems((currList) => currList.filter((itm, idx) => itm.ItemID != i.ItemID));
    }
    return { items, setItems, createItem, updateItem, deleteItem };
}


export function useOrdersContext() {

}