export const GRAPHHOPPER_BASE_URI =
    process.env.REACT_APP_GRAPHHOPPER_BASE_URI || process.env.NODE_ENV === "production" // manually set in .env file
        ? ".." // on production, assume we're running at <server>/maps, and apis are running at <server>/*
        : ".."; // on dev, requests are proxied via package.json
