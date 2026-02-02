// globals.d.ts file
declare global {
  var MY_GLOBAL_VAR: string;
  interface Window {
    // For browser environment
    MY_GLOBAL_VAR: string;
  }
  namespace NodeJS {
    // For Node.js environment
    interface Global {
      MY_GLOBAL_VAR: string;
    }
  }
}

// This is required to make the file a module while keeping the global declarations
export {};
