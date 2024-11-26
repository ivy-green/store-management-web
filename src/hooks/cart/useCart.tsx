'use client'

import { IProductResponse } from "@/models/responses/productResponses";
import { addDataToLS, getDataFromLS, removeDataInLS } from "@/utils/localStorageUtils";
import { useState } from "react";

export const useCart = () => {
    const [cartList, setCartList] = useState<IProductResponse[]>(() => {
        return JSON.parse(getDataFromLS("cart") ?? "[]")
    });

    const toggleItemToCart = (item: IProductResponse) => {
        let prevList = cartList;
        if (prevList.some(product => product.name === item.name)) {
            prevList = prevList.filter(product => product.name !== item.name);
        } else {
            prevList = [...prevList, { ...item, quantity: 1 }];
        }

        setCartList(prevList)
        addDataToLS("cart", JSON.stringify(prevList));
    }

    const clearCartList = () => {
        setCartList([]);
        removeDataInLS("cart");
    }

    // const updateDataFromLS = () => {
    //     var dataStr = getDataFromLS("cart");
    //     setCartList(JSON.parse(dataStr ?? "[]"))
    // }

    // useEffect(() => {
    //     updateDataFromLS()
    // }, [cartList]);

    return {
        cartList,
        toggleItemToCart,
        clearCartList,
    }
}