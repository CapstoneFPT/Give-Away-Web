import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AccountApi, AddressApi, DeliveryListResponse, DeliveryRequest, UpdateDeliveryRequest } from "../api";
import { notification } from "antd";

const fetchAddresses = async (userId: string) => {
  const accountApi = new AccountApi();
  const response = await accountApi.apiAccountsAccountIdDeliveriesGet(userId);
  return response.data.data || [];
};

const addNewAddress = async ({ userId, address }: { userId: string; address: DeliveryRequest }) => {
  const accountApi = new AccountApi();
  await accountApi.apiAccountsAccountIdDeliveriesPost(userId, address);
};

const updateAddress = async ({ userId, addressId, address }: { userId: string; addressId: string; address: UpdateDeliveryRequest }) => {
  const accountApi = new AccountApi();
  await accountApi.apiAccountsAccountIdDeliveriesDeliveryIdPut(addressId, userId, address);
};

const deleteAddress = async ({ userId, addressId }: { userId: string; addressId: string }) => {
  const accountApi = new AccountApi();
  await accountApi.apiAccountsAccountIdDeliveriesDeliveryIdDelete(addressId, userId);
};

const setDefaultAddress = async (addressId: string) => {
  const addressApi = new AddressApi();
  await addressApi.apiAddressesAddressIdSetDefaultPatch(addressId);
};

export const useAddresses = (userId: string) => {
  const queryClient = useQueryClient();

  const { data: addresses = [], isLoading, error } = useQuery<DeliveryListResponse[], Error>({
    queryKey: ['addresses', userId],
    queryFn: () => fetchAddresses(userId),
    enabled: !!userId,
  });

  const addAddressMutation = useMutation({
    mutationFn: addNewAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', userId] });
      notification.success({
        message: "Success",
        description: "New address added successfully.",
      });
    },
    onError: (error) => {
      console.error('Error adding new address:', error);
      notification.error({
        message: "Error",
        description: "An error occurred while adding new address. Please try again.",
      });
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', userId] });
      notification.success({
        message: "Success",
        description: "Address updated successfully.",
      });
    },
    onError: (error) => {
      console.error('Error updating address:', error);
      notification.error({
        message: "Error",
        description: "An error occurred while updating the address. Please try again.",
      });
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', userId] });
      notification.success({
        message: "Success",
        description: "Address deleted successfully.",
      });
    },
    onError: (error) => {
      console.error('Error deleting address:', error);
      notification.error({
        message: "Error",
        description: "An error occurred while deleting the address. Please try again.",
      });
    },
  });

  const setDefaultAddressMutation = useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', userId] });
      notification.success({
        message: "Success",
        description: "Default address set successfully.",
      });
    },
    onError: (error) => {
      console.error('Error setting default address:', error);
      notification.error({
        message: "Error",
        description: "An error occurred while setting the default address. Please try again.",
      });
    },
  });

  return {
    addresses,
    isLoading,
    error,
    addNewAddress: (address: DeliveryRequest) => addAddressMutation.mutate({ userId, address }),
    updateAddress: (addressId: string, address: UpdateDeliveryRequest) => updateAddressMutation.mutate({ userId, addressId, address }),
    deleteAddress: (addressId: string) => deleteAddressMutation.mutate({ userId, addressId }),
    setDefaultAddress: (addressId: string) => setDefaultAddressMutation.mutate(addressId),
  };
};