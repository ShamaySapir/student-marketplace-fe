// This is an example of how to access a session from an API route
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  res.send(JSON.stringify(session, null, 2));
};
export default handler;
