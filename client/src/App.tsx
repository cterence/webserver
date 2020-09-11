import React, { Suspense } from "react";
import PulseLoader from "react-spinners/PulseLoader";

import HomePage from "./pages/home";

const App = () => {
    return (
        <Suspense fallback={PulseLoader}>
            <HomePage />
        </Suspense>
    );
};

export default App;
