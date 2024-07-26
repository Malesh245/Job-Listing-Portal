import React from "react";
import Button from "./Button";
import InputField from "../components/InputField";

const Salary = ({ handleChange, handleOnClick }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Salary</h4>
      <div className="mb-4">
        <Button onClickHandler={handleOnClick} value="Hourly" title="Hourly" />
        <Button
          onClickHandler={handleOnClick}
          value="Monthly"
          title="Monthly"
        />
        <Button onClickHandler={handleOnClick} value="Yearly" title="Yearly" />
      </div>
      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>Any
        </label>
        <InputField
          handleChange={handleChange}
          value={30}
          title="<30K"
          name="test2"
        />
        <InputField
          handleChange={handleChange}
          value={50}
          title="< 50K"
          name="test2"
        />
        <InputField
          handleChange={handleChange}
          value={80}
          title="< 80K"
          name="test2"
        />
        <InputField
          handleChange={handleChange}
          value={100}
          title="< 100K"
          name="test2"
        />
      </div>
    </div>
  );
};

export default Salary;
