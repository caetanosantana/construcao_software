import { ReactNode, useRef } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ButtonAddFileProps {
  onChange?: (files: File[]) => void;
  className?: string;
  children: ReactNode;
  accept?: string;
  multiple?: boolean;
}

export function ButtonFile({
  onChange,
  className,
  children,
  accept,
  multiple,
}: ButtonAddFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    onChange?.(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("w-fit", className)}>
      <input
        ref={fileInputRef}
        id="file-upload-handle"
        type="file"
        onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
        className="hidden"
        accept={accept}
        multiple={multiple}
      />
      <Button variant="outline" onClick={handleClick} type="button">
        {children}
      </Button>
    </div>
  );
}
