import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: "#1F2937",
                secondary: "#E4F2D0",
            },
            backdropBlur: {
                xs: "2px",
                sm: "4px",
                md: "8px",
                lg: "12px",
                xl: "16px",
            },
            backdropOpacity: {
                20: "0.2",
                30: "0.3",
                40: "0.4",
                50: "0.5",
                60: "0.6",
                70: "0.7",
                80: "0.8",
                90: "0.9",
            },
        },
    },

    plugins: [forms],
};
