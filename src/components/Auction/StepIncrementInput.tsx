import React, { useState, useEffect } from "react";
import { Input, Button, message, Typography } from "antd";
import { useAuctionData } from "../../hooks/auctionHooks";

const StepIncrementInput: React.FC<{
  initialPrice: number;
  onStepIncrementChange: (value: number) => void;
  currentPercentage: number;
}> = ({ initialPrice, onStepIncrementChange, currentPercentage }) => {
  const [inputValue, setInputValue] = useState<string>("");
  useEffect(() => {
    setInputValue(currentPercentage.toFixed(0));
  }, [currentPercentage]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,3}(\.\d{0,2})?$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleSetStepIncrement = () => {
    const percentage = parseFloat(inputValue);
    if (percentage >= 1 && percentage <= 100) {
      onStepIncrementChange(percentage);
      message.success(`Step increment set to ${percentage}%`);
    } else {
      message.error("Please enter a valid percentage between 1 and 100");
    }
  };

  const currentStepIncrement = (initialPrice * currentPercentage) / 100;
  return (
    <div>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        style={{ width: "100px", marginRight: "10px" }}
        placeholder="1-100%"
      />
      <Button onClick={handleSetStepIncrement}>Set Step Increment</Button>
      <Typography.Text style={{ marginLeft: "10px" }}>
        Current Step Increment: {currentStepIncrement.toFixed(0)} VND
      </Typography.Text>
    </div>
  );
};

export default StepIncrementInput;