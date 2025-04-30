import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      icon={<LeftOutlined />}
      size="medium"
      className="absolute top-5 left-5 z-10 bg-primary-dark text-primary-light border-0 shadow-light dark:shadow-dark"
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 10,
      }}
    />
  );
};

export default BackButton;
