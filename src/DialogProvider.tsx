import { useCallback, useMemo, useState } from "react";
import { dialogContext, type DialogContent } from "./context";
import { Dialog } from "./components/Dialog";

export function DialogProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<DialogContent>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(
    (title: string, content: DialogContent) => {
      setTitle(title);
      setContent(content);
      setIsOpen(true);
    },
    [setTitle, setContent]
  );

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <dialogContext.Provider value={value}>
      {children}
      {isOpen && <Dialog title={title} content={content} />}
    </dialogContext.Provider>
  );
}
