import { renderTrpcPanel } from "trpc-panel";

import { appRouter } from "~/server/api/root";
import { getBaseUrl } from "~/utils/api";

import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  if (env.NODE_ENV !== "development") {
    res
      .status(403)
      .send({ message: "Playground available only in development mode" });
  }

  res.status(200).send(
    renderTrpcPanel(appRouter, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      url: `${getBaseUrl()}/api/trpc`,
      transformer: "superjson",
    }),
  );
};
export default handler;