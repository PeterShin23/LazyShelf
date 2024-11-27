import { colorPairs } from "../../constants/colors";

export const error = (uiColor: string, message?: string) => {
  const container = document.getElementById("showcase-container");

  if (!container) return;

  let errorNode = document.createElement('div');
  errorNode.id = "showcase-error-toaster";
  errorNode.className = "absolute right-0 top-0 mt-28 w-auto h-fit py-4 pl-6 pr-8 z-50";
  errorNode.style.backgroundColor = colorPairs[uiColor].dark;
  errorNode.style.color = colorPairs[uiColor].light;
  errorNode.textContent = message ?? "Something went wrong!";

  container.appendChild(errorNode);

  requestAnimationFrame(() => {
    errorNode.classList.add("slide-in-right");
  
    setTimeout(() => {
      errorNode.classList.remove("slide-in-right");
      errorNode.classList.add("slide-out-right");

      setTimeout(() => errorNode.remove(), 300);
    }, 2500);
  });
}