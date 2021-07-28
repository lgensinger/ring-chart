const configuration = {};

const configurationDimension = {
    height: process.env.DIMENSION_HEIGHT || 600,
    width: process.env.DIMENSION_WIDTH || 600
}

export { configuration, configurationDimension };
export default configuration;
