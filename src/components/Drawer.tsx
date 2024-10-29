import { useDialog, usePredefinedDialog } from "../context";

const useSuccessDialog = () => {
  const { open } = usePredefinedDialog("Success", "Data saved successfully");
  return open;
};

const useErrorDialog = () => {
  const { open } = useDialog();
  return (message?: string) =>
    open("Error", `Failed to save data. Error: ${message}`);
};

export function Drawer() {
  const successMessage = useSuccessDialog();
  const failureMessage = useErrorDialog();
  const save = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(() => {
        throw new Error("My custom error");
      })
      .then((json) => console.log(json))
      .then(() => successMessage())
      .catch((error) => failureMessage(error.message));
  };

  const save2 = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then(() => successMessage())
      .catch(() => failureMessage());
  };
  return (
    <div className="outline-green-400 outline">
      <h1>Drawer</h1>
      <div className="flex gap-2 justify-center">
        <button onClick={() => save()}>Fetch 1</button>
        <button onClick={() => save2()}>Fetch 2</button>
      </div>
    </div>
  );
}
