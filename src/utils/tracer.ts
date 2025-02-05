import tracer from "dd-trace";

// initialized in a different file to avoid hoisting.

tracer.init({
  logInjection: true,
  tags: {
    track_error: true,
  },
});

export default tracer;
