import { serve } from "bun";
import index from "./index.html";
import { ListDataSets } from "./backend/Routes";

const dataSetsRoute = "/dataSets";
const jobs = "/jobs";
const jobsId = "/jobs/:id"
const jobsOutput = "/jobs/:id/output";


function getDataSetPath(request: Request): string {
  return new URL(request.url).pathname.slice(dataSetsRoute.length) || "/";
}

const server = serve({
  routes: {
    "/*": index,

    [jobs]: {
      async GET() {
        return Response.json({
          message: "List of jobs",
        });
      },
    },

    [jobsId]: {
      async GET(req) {
        const id = req.params.id;
        return Response.json({
          message: `Job ${id}`,
        });
      },
    },

    [jobsOutput]: {
      async GET(req) {
        const id = req.params.id;
        return Response.json({
          message: `Job ${id} output`,
        });
      },
    },

    [`${dataSetsRoute}/*`]: {
      async GET(req) {
        const path = getDataSetPath(req);
        try {
          const response = await ListDataSets(path);
          return Response.json ({
            message: response
          });
        } catch (error) {
          return Response.json ({
            error: error
          }, {
            status: 500
          });
        }
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
