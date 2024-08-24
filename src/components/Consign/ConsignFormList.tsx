import React from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Upload,
  Button,
  Typography,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { SizeType } from "../../api"; // Ensure SizeType is imported from the correct path
import ConsignItemCard from "./ConsignItemCard";

const { Option } = Select;
const { TextArea } = Input;
const ConsignFormList = ({
  fields,
  fileLists,
  handleFileChange,
  add,
  remove,
}: any) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      gap: "10px",
      flexWrap: "wrap",
    }}
  >
    {fields.map(
      ({ key, name, ...restField }: { key: string; name: string }) => (
        <ConsignItemCard
          key={key}
          name={name}
          restField={restField}
          fileLists={fileLists}
          handleFileChange={handleFileChange}
          remove={remove}
        />
      )
    )}
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
        <Button
          style={{
            width: "10%",
            marginTop: "20px",
            backgroundColor: "black",
            color: "white",
          }}
          onClick={() => add()}
        >
          Add Item
        </Button>
    </div>
  </div>
);

export default ConsignFormList;
