import { serve } from "bun";
import index from "./index.html";
import { commandMap } from "./backend/FetchConfig";
import { ListDataSets } from "./backend/Routes";


const server = serve({
  routes: {
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

    "/dataSets": {
      async GET() {
        return Response.json({
          message: await ListDataSets(),
        });
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
