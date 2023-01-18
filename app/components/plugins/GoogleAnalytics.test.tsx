import { render } from "@testing-library/react";
import { GoogleAnalytics } from "./GoogleAnalytics";
import { installGlobals } from "@remix-run/node";
import { BrowserRouter, Routes, Route } from "react-router-dom";

installGlobals();

describe("GoogleAnalytics", () => {
  test("generates script tags", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<GoogleAnalytics gaTrackingId="234567" />} />
        </Routes>
      </BrowserRouter>
    );
    expect(document.querySelector("script")).toBeTruthy();
  });
});
