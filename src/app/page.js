import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">Welcome to SJ Real Estate</h1>
      <p>
        home page content will be displayed here. You can explore properties, manage your appointments, and more. Use the navigation menu to get started!
      </p>
    </div>
  );
}
