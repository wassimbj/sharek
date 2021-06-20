import { Box, Layer, Toast } from "gestalt";
import React from "react";

export function Popup({ error, msg }) {
  return (
    <Layer>
      <Box
        fit
        top
        dangerouslySetInlineStyle={{
          __style: {
            top: 5,
            left: "50%",
            transform: "translateX(-50%)",
          },
        }}
        paddingX={1}
        position="fixed"
      >
        <Toast color={error ? "red" : "white"} text={msg} />
      </Box>
    </Layer>
  );
}
