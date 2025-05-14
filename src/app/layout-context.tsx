import { createContext, useContext } from "react";

export const LayoutContext = createContext({
  extraProp: null, // Default value
});

// Optional: Create a custom hook for easier consumption
export const useLayoutContext = () => useContext(LayoutContext);
