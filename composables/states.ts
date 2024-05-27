import { type IMessage } from "~/interfaces/imessage";

export const useIsChatting = () => useState("isChatting", () => false);
export const useMessages = () => useState<IMessage[]>("messages", () => []);
