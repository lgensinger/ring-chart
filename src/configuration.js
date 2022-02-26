import packagejson from "../package.json" assert { type: "json" };

const configuration = {
    name: packagejson.name.replace("/", "-").slice(1)
};

const configurationDimension = {
    height: process.env.DIMENSION_HEIGHT || 600,
    width: process.env.DIMENSION_WIDTH || 600
}

export { configuration, configurationDimension };
export default configuration;
