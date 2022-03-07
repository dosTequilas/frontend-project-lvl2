   
install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage --coverageProvider=v8

link:
	npm link

genDiff:
	./bin/gendiff.js ./__fixtures__/file1.yml ./__fixtures__/file2.yml

test:
	npm run test

test-watch:
	npm run testWatch

genPlain:
	./bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json -f plain

genStylish:
	./bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json -f stylish