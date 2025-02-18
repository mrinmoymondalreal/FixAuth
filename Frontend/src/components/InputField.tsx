import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";
import { Button } from "./ui/button";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

interface InputFieldProps {
  control: Control<any>;
  name: string;
  placeholder: string;
  label: string;
  type?: "text" | "password" | "email" | "textarea";
  disabled?: boolean;
}

function InputField({
  control,
  name,
  placeholder,
  label,
  type: _type,
  disabled = false,
}: InputFieldProps) {
  const [type, setType] = useState(_type || "text");
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg text-primary">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {_type?.toString() == "textarea" ? (
                <Textarea
                  disabled={disabled}
                  placeholder={placeholder}
                  rows={10}
                  {...field}
                />
              ) : (
                <Input
                  disabled={disabled}
                  type={type}
                  placeholder={placeholder}
                  {...field}
                />
              )}
              {_type?.toString() == "password" ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-2 top-2.5 [&_svg]:size-5"
                  onClick={() =>
                    setType(type == "password" ? "text" : "password")
                  }
                >
                  {type == "password" ? <EyeIcon /> : <EyeOffIcon />}
                </Button>
              ) : null}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputField;
