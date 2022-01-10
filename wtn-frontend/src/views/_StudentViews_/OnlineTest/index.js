import React from "react";
import { useParams } from "react-router";
import { TestDetailsProvider } from "./hooks/online-test-context";
import OnlineTest from "./OnlineTest";

export default () => {
  const { testId } = useParams();
  return (
    <TestDetailsProvider testId={testId}>
      <OnlineTest />
    </TestDetailsProvider>
  );
};
