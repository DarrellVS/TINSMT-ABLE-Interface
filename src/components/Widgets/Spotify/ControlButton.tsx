import { IconButton } from "@chakra-ui/react";
import { JSXElementConstructor, ReactElement } from "react";

export default function ControlButton({
  icon,
  isEnabled,
  onClick,
}: {
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  isEnabled?: boolean;
  onClick: () => void;
}) {
  return (
    <IconButton
      aria-label="control button"
      icon={icon}
      size="lg"
      _after={{
        content: "''",
        position: "absolute",
        top: "-5px",
        right: "-5px",
        borderRadius: "50%",
        bg: "green.300",
        h: "10px",
        w: "10px",
        opacity: isEnabled ? 1 : 0,
      }}
      onClick={onClick}
    />
  );
}
