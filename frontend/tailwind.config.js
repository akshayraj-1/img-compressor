/** @type {import('tailwindcss').Config} */
import ImageData from "./src/values/images-data.json";
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                colorPrimary: "#407BFF",
                colorPrimaryLight: "#60a7f9",
                colorBackground: "#fff",
                colorSurface: "#fcfcff",
                colorSurfaceSecondary: "#f5f5f8",
                textPrimary: "#263238",
                textSecondary: "#8f9ba4"
            },
            backgroundImage: {
                mainBg: `url("${ImageData.mainBg}")`,
                button: `linear-gradient(125deg, #407BFF 0%, #60a7f9 100%)`
            },
            boxShadow: {
                navBar: "0px 10px 25px -5px rgba(33, 35, 38, 0.05)",
                mainCard: "0px 25px 123px 0px rgba(33, 35, 38, 0.1)",
                primaryButton: "0px 20px 70px 0px rgba(74, 144, 226, 0.25)"
            },
            fontFamily: {
                poppins: "Poppins, sans-serif"
            }
        }
    },
    plugins: [],
}
