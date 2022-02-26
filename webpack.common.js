import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import webpack from "webpack";

const __dirname = dirname(fileURLToPath(import.meta.url));

const commonConfig = {

    entry: {
        index: "./src/index.js"
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "DIMENSION_HEIGHT": JSON.stringify(process.DIMENSION_HEIGHT),
                "DIMENSION_WIDTH": JSON.stringify(process.DIMENSION_WIDTH)
            }
        })
    ],

    output: {
        filename: "ring-chart.bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    }

 };

 export { commonConfig };
 export default commonConfig;
