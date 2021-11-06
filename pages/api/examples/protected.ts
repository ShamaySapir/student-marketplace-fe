// This is an example of to protect an API route
import { NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { NextApiRequest } from "next-auth/internals/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};
export default handler;
