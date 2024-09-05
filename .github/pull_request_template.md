# Test before submitting

Before submitting a Pull Request, please test your code. If you created a new created a new feature, then create the test function, too. Please refer to [this document](../CONTRIBUTING.md).

Put the name of the test function of the service you created in the command below.
This is a regular expression that returns all tests containing the character string, so if there are several test codes, you can put a keyword including all of the test codes and turn them.
If you omit the include statement and operate the test, all the test codes we write will work, and myriad errors will occur in your code without environmental variables.

```ts
npm run build && npm run test -- --include TEST_FUNCTION_NAME
```

Of course you won't be able to provide us with your environmental variables, so we'll replace them with our environmental variables to run the program and merge it depending on whether it passes or not.

# Purpose

Please explain to our developers what the features you modified or developed are for.

# Check List

- [ ] Passing an existing or newly created test
- [ ] sufficient summary and description for LLM to understand
- [ ] Does it ensure backward compatibility with existing features, or does the modifications not affect pre-modification request, response type?
