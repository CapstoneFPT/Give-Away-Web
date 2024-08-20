import {useCallback, useEffect, useState} from "react";
import {AccountApi, DeliveryListResponse} from "../api";
import {notification} from "antd";

export const useAddresses = (userId: string) => {
    const [addresses, setAddresses] = useState<DeliveryListResponse[]>([]);

    const fetchAddresses = useCallback(async () => {
        try {
            const accountApi = new AccountApi();
            const response = await accountApi.apiAccountsAccountIdDeliveriesGet(userId);
            setAddresses(response.data.data || []);
        } catch (e) {
            console.log("Error fetching addresses:", e);
            notification.error({
                message: "Failed to fetch addresses. Please try again later.",
            })
        }
    },[userId])

    return {addresses, fetchAddresses};
}