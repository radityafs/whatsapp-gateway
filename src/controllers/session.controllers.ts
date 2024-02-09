import { Request, Response } from "express";
import Whatsapp from "../services/whatsapp";
import { v4 as uuidv4 } from "uuid";
import response from "../utils/response.util";
import Session from "../models/Sessions";
import QR from "qrcode";

const createSession = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const sessionName = uuidv4();

    // Check if user already has a session
    const session = await Session.findOne({
      where: {
        userId,
        status: "CREATED",
      },
    });

    if (session) {
      await Session.destroy({
        where: {
          userId,
          status: "CREATED",
        },
      });

      await Whatsapp.deleteSession(session.sessionId);
    }

    // Create session
    Whatsapp.onQRUpdated(async ({ sessionId, qr }) => {
      if (sessionId === sessionName) {
        Session.create({
          sessionId,
          status: "CREATED",
          userId: userId,
        });

        await QR.toFile(`./public/qr/${sessionName}.png`, qr, {
          color: {
            dark: "#000",
            light: "#FFF",
          },
        });

        response.success(res, "Successfully created session", {
          sessionId,
          qr,
          qr_image: `/qr/${sessionName}.png`,
        });
      }
    });

    Whatsapp.startSession(sessionName);
  } catch (error: any) {
    response.failed(res, error.message, 500);
  }
};

const deleteSession = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const sessionId = req.params.sessionId;

    const session = await Session.findOne({
      where: {
        userId,
        sessionId,
      },
    });

    if (!session) {
      return response.failed(res, "Session not found", 404);
    }

    await Whatsapp.deleteSession(sessionId);
    await Session.destroy({
      where: {
        userId,
        sessionId,
      },
    });

    response.success(res, "Successfully deleted session", {
      sessionId,
    });
  } catch (error: any) {
    response.failed(res, error.message, 500);
  }
};

const getSessions = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const sessions = await Session.findAll({
      where: {
        userId,
      },
    });

    response.success(res, "Successfully retrieved sessions", sessions);
  } catch (error: any) {
    response.failed(res, error.message, 500);
  }
};

const getSession = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const sessionId = req.params.sessionId;

    const session = await Session.findOne({
      where: {
        userId,
        sessionId,
      },
    });

    if (!session) {
      return response.failed(res, "Session not found", 404);
    }

    response.success(res, "Successfully retrieved session", session);
  } catch (error: any) {
    response.failed(res, error.message, 500);
  }
};

export { createSession, deleteSession, getSessions, getSession };
