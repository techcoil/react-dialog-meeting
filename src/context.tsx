import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Dialog } from "./components/Dialog";

const dialogContext = createContext<{
  open: (title: string, content: string) => void;
  close: () => void;
}>({
  open: () => {},
  close: () => {},
});

export function DialogProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(
    (title: string, content: string) => {
      setTitle(title);
      setContent(content);
      setIsOpen(true);
    },
    [setTitle, setContent]
  );

  const close = () => {
    setIsOpen(false);
  };

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <dialogContext.Provider value={value}>
      {children}
      {isOpen && <Dialog title={title} content={content} />}
    </dialogContext.Provider>
  );
}

export const useDialog = () => useContext(dialogContext);

export const usePredefinedDialog = (title, content) => {
  const { open, ...more } = useDialog();

  return {
    open: () => open(title, content),
    ...more,
  };
};
