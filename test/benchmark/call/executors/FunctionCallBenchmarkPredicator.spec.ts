import { describe, expect, it } from "vitest";
import { FunctionCallBenchmarkPredicator } from "./FunctionCallBenchmarkPredicator";

const success = FunctionCallBenchmarkPredicator.success;
describe("FunctionCallBenchmarkPredicator.success", () => {
  const mockApplication = {
    functions: [
      {
        operation: () => ({
          "x-samchon-accessor": ["testFunc"],
          "x-samchon-controller": "TestController",
        }),
      },
      {
        operation: () => ({
          "x-samchon-accessor": ["testFunc1"],
          "x-samchon-controller": "TestController1",
        }),
      },
      {
        operation: () => ({
          "x-samchon-accessor": ["testFunc2"],
          "x-samchon-controller": "TestController2",
        }),
      },
    ],
  } as any;

  const mockOperations = new Map();
  const mockFunction = async function testFunc() {
    1;
  };
  const mockFunction1 = async function testFunc1() {
    1;
  };
  const mockFunction2 = async function testFunc2() {
    1;
  };

  mockOperations.set(mockFunction, { name: "TestController" });
  mockOperations.set(mockFunction1, { name: "TestController1" });
  mockOperations.set(mockFunction2, { name: "TestController2" });

  it("should return true for standalone match", () => {
    const result = success({
      application: mockApplication,
      operations: mockOperations,
      expected: {
        type: "standalone",
        function: mockFunction,
      },
      functionList: [{ function: mockApplication.functions[0] }],
      strict: false,
    });
    expect(result).toBe(true);
  });

  it("should return true for allOf when all match", () => {
    const result = success({
      application: mockApplication,
      operations: mockOperations,
      expected: {
        type: "allOf",
        allOf: [
          {
            type: "standalone",
            function: mockFunction,
          },
        ],
      },
      functionList: [{ function: mockApplication.functions[0] }],
      strict: false,
    });
    expect(result).toBe(true);
  });

  it("should return true for anyOf when any matches", () => {
    const result = success({
      application: mockApplication,
      operations: mockOperations,
      expected: {
        type: "anyOf",
        anyOf: [
          {
            type: "standalone",
            function: mockFunction,
          },
        ],
      },
      functionList: [{ function: mockApplication.functions[0] }],
      strict: false,
    });
    expect(result).toBe(true);
  });

  it("should handle array type correctly", () => {
    const result = success({
      application: mockApplication,
      operations: mockOperations,
      expected: {
        type: "array",
        items: [
          {
            type: "standalone",
            function: mockFunction,
          },
        ],
      },
      functionList: [{ function: mockApplication.functions[0] }],
      strict: false,
    });
    expect(result).toBe(true);
  });

  it("should handle array type with multiple items", () => {
    const result = success({
      application: mockApplication,
      operations: mockOperations,
      expected: {
        type: "array",
        items: [
          {
            type: "standalone",
            function: mockFunction,
          },
          {
            type: "standalone",
            function: mockFunction,
          },
        ],
      },
      functionList: [
        { function: mockApplication.functions[0] },
        { function: mockApplication.functions[0] },
      ],
      strict: false,
    });
    expect(result).toBe(true);
  });

  it("should handle array type with different functions and extra function in between", () => {
    const result = success({
      application: mockApplication,
      operations: mockOperations,
      expected: {
        type: "array",
        items: [
          {
            type: "standalone",
            function: mockFunction,
          },
          {
            type: "standalone",
            function: mockFunction2,
          },
        ],
      },
      functionList: [
        { function: mockApplication.functions[0] },
        { function: mockApplication.functions[1] }, // extra function
        { function: mockApplication.functions[2] },
      ],
      strict: false,
    });
    expect(result).toBe(true);
  });
});
