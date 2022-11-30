import { Box } from "@chakra-ui/react";
import { useRef } from "react";
import useOutsideAlerter from "../hooks/useOutsideAlerter";

// Component that alerts if you click outside of it
export function OutsideAlerter({
  cb,
  children,
}: {
  cb: () => void;
  children: React.ReactNode;
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, cb);

  return <Box ref={wrapperRef}>{children}</Box>;
}
