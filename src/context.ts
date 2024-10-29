import { createContext, useContext } from "react";

export type DialogContent = string | React.ReactNode | undefined;

export const dialogContext = createContext<{
  open: (title: string, content: DialogContent) => void;
  close: () => void;
}>({
  open: () => {},
  close: () => {},
});

export const useDialog = () => useContext(dialogContext);

export const usePredefinedDialog = (title: string, content: DialogContent) => {
  const { open, ...more } = useDialog();

  return {
    open: () => open(title, content),
    ...more,
  };
};
