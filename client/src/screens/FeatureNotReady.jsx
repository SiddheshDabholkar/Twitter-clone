import React from "react";
import { Button } from "../components/FloatingButton";
import { FaFeatherAlt } from "react-icons/fa";

export default function FeatureNotReady() {
  return (
    <>
      <h1>Feature not ready</h1>
      <Button>
        <FaFeatherAlt style={{ color: "#fff", fontSize: "22px" }} />
      </Button>
    </>
  );
}
