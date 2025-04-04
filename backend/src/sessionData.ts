import "express-session";
import { SessionData } from "express-session";

declare module "express-session" {
  interface SessionData {
    email: string;
    name: string;
    isAdmin: boolean;
  }
}

export class SessionManager {
  private static instance: SessionManager;
  private session: Map<string, SessionData> = new Map();

  public static getInstance() {
    if (!SessionManager.instance) {
      return (SessionManager.instance = new SessionManager());
    } else {
      return SessionManager.instance;
    }
  }

  public createSession(session: SessionData) {
    this.session.set(session.name, session);
  }

  public getSession(nome: string) {
    return this.session.get(nome);
  }

  public deleteSession(nome: string) {
    this.session.delete(nome);
  }

  getAllSession() {
    return this.session;
  }
}
