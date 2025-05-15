/* eslint-disable react/prop-types */
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Calendar as CalendarIcon, File } from "lucide-react";
import { format } from "date-fns";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../ui/input-otp";

const FormControls = ({
  formControls = [],
  formData,
  setFormData,
  handleGetOTP,
  isButtonDisabled,
  otpSent,
  otpVerified,
}) => {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            className="w-full p-2 border rounded"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "file":
        element = (
          <div className="flex items-center space-x-4">
            {/* Custom Button for File Upload */}
            <label
              htmlFor={getControlItem.name}
              className="cursor-pointer px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-700"
            >
              <span className="flex items-center justify-center gap-2">
                <File size="18px" />
                Upload File
              </span>
            </label>

            {/* Hidden File Input */}
            <input
              id={getControlItem.name}
              type="file"
              name={getControlItem.name}
              className="hidden"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                setFormData({
                  ...formData,
                  [getControlItem.name]: file, // ✅ Store actual file object
                });
              }}
            />

            {/* Optional Preview/File Name */}
            {formData[getControlItem.name] && (
              <span className="text-sm text-gray-600">
                {formData[getControlItem.name]?.name || "File selected"}
              </span>
            )}
          </div>
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [getControlItem.name]: value })
            }
            value={value}
          >
            <SelectTrigger className="w-full p-2 border rounded">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent className="w-full border rounded bg-white">
              {getControlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.value} value={optionItem.value}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            className="w-full p-2 border rounded min-h-17"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "datePicker":
        element = (
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="cursor-pointer px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-700">
                  <CalendarIcon className="mr-2 h-3 w-3" />
                  {value ? (
                    format(new Date(value), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 z-[9999] bg-white shadow-lg border rounded-md absolute"
                align="center"
                side="bottom"
                sideOffset={8}
                style={{ minWidth: "250px" }}
              >
                <Calendar
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={(selectedDate) =>
                    setFormData({
                      ...formData,
                      [getControlItem.name]: selectedDate,
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        );
        break;
      case "otp":
        element = (
          <div className="flex items-center gap-2">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(otpValue) =>
                setFormData((prev) => ({
                  ...prev,
                  [getControlItem.name]: otpValue,
                }))
              }
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button
              type="button"
              className="px-3 py-3 rounded bg-blue-500 text-white text-sm disabled:bg-gray-400 cursor-pointer"
              onClick={handleGetOTP}
              disabled={
                isButtonDisabled || otpVerified || (otpSent && value.length < 6)
              }
            >
              {otpVerified ? "Verified " : otpSent ? "Verify OTP" : "Get OTP"}
            </Button>
          </div>
        );
        break;

      default:
        element = (
          <Input
            className="w-full p-2 border rounded"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controlItem) => (
        <div key={controlItem.name}>
          <Label htmlFor={controlItem.name} className="mb-2">
            {controlItem.label}
          </Label>
          {renderInputsByComponentType(controlItem)}
        </div>
      ))}
    </div>
  );
};

export default FormControls;
