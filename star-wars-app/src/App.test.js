import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import axios from "axios";

test("App renders", async () => {
    const wrapper = rtl.render(<App />);

    const logo = wrapper.getByAltText(/logo/i);

    expect(logo).toBeVisible();
});

jest.mock("axios", () => {
    return {
        get: jest.fn(() => Promise.resolve({
            data: {
                results: ['Simon', '169', '69', 'red', 'red']
            }
        }))
    }
})

test("API successfully is called", async () => {
    const wrapper = rtl.render(<App />);

    await wrapper.findAllByAltText(/logo/i);

    expect(axios.get).toHaveBeenCalled();
})

test("Next Button calls upon API", async () => {

    const wrapper = rtl.render(<App />);
    const next = wrapper.getByText(/next/i)
    rtl.act(() => {
        rtl.fireEvent.click(next)
    })

    expect(axios.get).toHaveBeenCalled()
})