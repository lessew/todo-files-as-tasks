module.exports = {
	preset: "ts-jest",
	transform: { '^.+\\.ts?$': ['ts-jest', { isolatedModules: true }] },
	testEnvironment: 'node',
	testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'd.ts'],
	collectCoverage: false,
	transformIgnorePatterns: ["<rootDir>/node_modules/"],
	rootDir: "./",
	moduleDirectories: ["./src", "./node_modules/"]
};
