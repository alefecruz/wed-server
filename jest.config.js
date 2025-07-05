/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    bail: 1,
    verbose: false,
    testEnvironment: 'node',
    transform: {
        '^.+\.ts$': ['ts-jest', {}],
    },
}
