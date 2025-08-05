/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    bail: 1,
    verbose: true,
    testEnvironment: 'node',
    transform: {
        '^.+\.ts$': ['ts-jest', {}],
    },
}
