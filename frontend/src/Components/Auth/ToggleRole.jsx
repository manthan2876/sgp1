import { Radio } from "antd";

function ToggleRole({ isUser, setIsUser }) {
  return (
    <div className="text-center mb-4">
      <Radio.Group
        value={isUser ? "user" : "postal"}
        onChange={(e) => setIsUser(e.target.value === "user")}
        className="dark:text-text-dark"
      >
        <Radio.Button
          value="user"
          className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
        >
          User
        </Radio.Button>
        <Radio.Button
          value="postal"
          className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
        >
          Post Admin
        </Radio.Button>
      </Radio.Group>
    </div>
  );
}

export default ToggleRole;
