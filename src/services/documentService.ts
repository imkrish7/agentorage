import { documentMachine } from "@/machines/documentMachine";
import { createActorContext } from "@xstate/react";

export const DocumentService = createActorContext(documentMachine, {});

export const useDocumentServiceState = DocumentService.useSelector;
export const useDocumentService = DocumentService.useActorRef;
