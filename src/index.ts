import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/jobs": {
      async GET() {
        return Response.json({
          message: "List of jobs",
        });
      },
    },

    "/jobs/:id": {
      async GET(req) {
        const id = req.params.id;
        return Response.json({
          message: `Job ${id}`,
        });
      },
    },

    "/jobs/:id/output": {
      async GET(req) {
        const id = req.params.id;
        return Response.json({
          message: `Job ${id} output`,
        });
      },
    },

  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
