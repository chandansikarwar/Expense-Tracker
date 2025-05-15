/* eslint-disable react/prop-types */

import FormControls from "./FormControl";
import { Button } from "../../ui/button";

function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
  buttonIcon,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* render form controls here */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button
        disabled={isButtonDisabled}
        type="submit"
        className=" p-2 bg-blue-500 text-white rounded disabled:opacity-50 mt-3
        cursor-pointer"
      >
        <span>{buttonIcon}</span>
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}
export default CommonForm;
