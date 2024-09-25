import {useCallback, useState} from "react";
import {AccountApi, BankAccountsListResponse} from "../api";
import {notification} from "antd";

export const useFetchBankAccounts = (userId :string) => {
    const [bankAccounts, setBankAccounts] = useState<BankAccountsListResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchBankAccounts = useCallback(async () => {
        setIsLoading(true);
        try {
            const accountApi = new AccountApi();
            const response = await accountApi.apiAccountsAccountIdBankaccountsGet(userId);
            setBankAccounts(response.data || []);
        } catch (e) {
        } finally {
            setIsLoading(false);
        }
    },[userId])

    return {bankAccounts, fetchBankAccounts, isLoading};
}