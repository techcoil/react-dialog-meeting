import { createPortal } from "react-dom";
import { useDialog } from "../context";
import { useEffect, useRef } from "react";

type Props = Readonly<{
  title: string;
  content: string | React.ReactNode;
}>;

const container: HTMLElement = document.querySelector("#modal-root")!;

export function Dialog({ title, content }: Props) {
  const { close } = useDialog();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function closeOnEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  });

  useEffect(() => {
    if (closeRef.current) {
      closeRef.current.focus();
    }
  }, [closeRef]);
  return (
    <>
      {createPortal(
        <div>
          <div
            className="fixed bg-black bg-opacity-40 inset-0"
            onClick={() => close()}
            role="presentation"
          />

          <div className="bg-red-500 absolute inset-10">
            <button
              onClick={() => close()}
              ref={closeRef}
              className="border text-xs px-2 py-1 hover:underline focus:underline"
            >
              Close
            </button>
            <h1>{title}</h1>
            <p>{content}</p>
          </div>
        </div>,
        container
      )}
    </>
  );
}
