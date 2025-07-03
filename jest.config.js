/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  moduleNameMapper: {
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@config$": "<rootDir>/src/config/index.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // optional
};
