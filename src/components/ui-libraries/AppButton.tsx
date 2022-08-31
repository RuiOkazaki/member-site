import { DOMAttributes, FC, memo, ReactNode } from "react";
import { Button } from "@mantine/core";

type Props = {
  type: "button" | "reset" | "submit";
  variant?: "filled" | "outline" | "light" | "gradient" | "white" | "default" | "subtle";
  color: "gray" | "red" | "blue" | "white" | "default";
  radius: "xs" | "sm" | "md" | "lg" | "xl";
  size: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  compact?: boolean;
  children: ReactNode;
  disabled?: boolean;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
};

export const AppButton: FC<Props> = memo(
  ({ type, variant, color, radius, size, compact, disabled, className, children, onClick }) => {
    return (
      <>
        <Button
          type={type}
          variant={variant}
          color={color}
          radius={radius}
          size={size}
          compact={compact}
          disabled={disabled}
          className={className}
          onClick={onClick}
        >
          {children}
        </Button>
      </>
    );
  }
);
AppButton.displayName = "AppButton";
