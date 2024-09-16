import React, { useState, useMemo } from "react";
import { Card, Button, Row, Col, InputNumber, message, Typography } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WalletOutlined } from "@ant-design/icons";
import { InitiateRechargeRequest, RechargeApi } from "../../api";
import backgroundImageUrl from "../../components/Assets/z5815359792408_03a75ffa56becc61f3a6cba433ff19be.jpg";

const { Title } = Typography;

const AddFund = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const userId = JSON.parse(localStorage.getItem("userId") || "null");
  const queryClient = useQueryClient();

  const suggestions = useMemo(() => {
    if (amount) {
      const baseMultipliers = amount >= 100000 ? [10, 100, 1000] : [1000, 10000, 100000];
      return baseMultipliers
        .map((multiplier) => Math.min(amount * multiplier, 100000000))
        .filter((suggestion, index, array) => suggestion !== array[index - 1]);
    }
    return [10000, 100000, 1000000];
  }, [amount]);

  const rechargeMutation = useMutation({
    mutationFn: (rechargeAmount: number) => {
      const rechargeApi = new RechargeApi();
      const request: InitiateRechargeRequest = {
        memberId: userId,
        amount: rechargeAmount,
      };
      return rechargeApi.apiRechargesInitiatePost(request);
    },
    onSuccess: (data) => {
      if (data.data.paymentUrl) {
        window.location.href = data.data.paymentUrl;
      } else {
        throw new Error("Payment URL not received");
      }
    },
    onError: (error) => {
      console.error("Recharge error", error);
      message.error("Recharge error. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["rechargeHistory"] });
    },
  });

  const handleAmountChange = (value: string | number | null) => {
    if (typeof value === "string") {
      const numericValue = value.replace(/\D/g, "");
      setAmount(numericValue ? parseInt(numericValue, 10) : null);
    } else {
      setAmount(value);
    }
  };

  const handleRecharge = (rechargeAmount: number) => {
    if (rechargeAmount >= 1000 && rechargeAmount <= 100000000) {
      rechargeMutation.mutate(rechargeAmount);
    } else {
      message.error("Amount must be between 1,000 and 100,000,000 VND");
    }
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("de-DE").format(balance);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundColor: "rgba(255, 255, 255, 0)",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "82vh",
      }}
    >
      <Card
        style={{ width: "100%", maxWidth: "500px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
      >
        <Title level={2} style={{ marginBottom: "24px", textAlign: "center" }}>
          <WalletOutlined style={{ marginRight: "8px" }} />
          Add Fund
        </Title>
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <InputNumber
              style={{ width: "100%", height: "50px", fontSize: "18px" }}
              placeholder="Enter amount"
              value={amount}
              maxLength={11} // Giới hạn số lượng ký tự nhập vào
              onChange={(value) => {
                // Check if the value exceeds the maximum limit
                if (value && value > 100000000) {
                  message.error("Amount cannot exceed 100,000,000!"); // Show error message
                  return; // Prevent updating the state
                }
                handleAmountChange(value); // Update state if within limit
              }}
              min={1000}
              max={100000000} // Set maximum value
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => Number.parseInt(value!.replace(/\$\s?|(,*)/g, ""))}
              onKeyDown={(event) => {
                // Prevent entering non-numeric characters and limit input length
                if (
                  !/[0-9]/.test(event.key) &&
                  event.key !== "Backspace" &&
                  event.key !== "Delete" &&
                  event.key !== "ArrowLeft" &&
                  event.key !== "ArrowRight"
                ) {
                  event.preventDefault();
                }

                if (event.currentTarget.value.length >= 11 && event.key !== "Backspace") {
                  event.preventDefault(); // Prevent input if length exceeds 9 digits
                }
              }}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          {suggestions.map((suggestion, index) => (
            <Col span={8} key={index}>
              <Button
                style={{ width: "100%", height: "40px" }}
                onClick={() => handleAmountChange(suggestion)}
              >
                {formatBalance(suggestion)} VND
              </Button>
            </Col>
          ))}
        </Row>
        <Button
          style={{
            width: "100%",
            marginTop: "24px",
            backgroundColor: "black",
            color: "white",
            height: "50px",
            fontSize: "18px",
          }}
          onClick={() => handleRecharge(amount || 0)}
          disabled={!amount || amount > 100000000 || rechargeMutation.isPending}
          loading={rechargeMutation.isPending}
        >
          Recharge
        </Button>
      </Card>
    </div>
  );
};

export default AddFund;
