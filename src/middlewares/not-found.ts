import express from "express";

function notFound(req: express.Request, res: express.Response) {
  return res.status(404).send("Resource not found");
}

export { notFound };
