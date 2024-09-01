Before submitting a Pull Request, please test your code.

If you created a new created a new feature, then create the test function, too.

Please refer to [this document](../CONTRIBUTING.md).

```ts
npm run build && npm run test -- --include TEST_FUNCTION_NAME
```

# Purpose

Please explain to our developers what the features you modified or developed are for.

# Check List

- [ ] Passing an existing or newly created test
- [ ] sufficient summary and description for LLM to understand
- [ ] Does it ensure backward compatibility with existing features, or does the modifications not affect pre-modification request, response type?
