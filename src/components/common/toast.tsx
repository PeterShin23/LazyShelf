
export const error = (message?: string, styles?: any) => {
  const container = document.getElementById("showcase-container");

  let errorNode = document.createElement('div');
  errorNode.id = "showcase-error-toaster";
  errorNode.className = "absolute right-0 top-0 mt-32 w-32 h-fit py-4 pl-6 pr-8 z-50 slide-from-right";
  errorNode.textContent = message;

  container.appendChild(errorNode);

  setTimeout(() => {
    errorNode.classList.add("slide-out-right");

    setTimeout(() => errorNode.remove(), 300);
  }, 2000);
}