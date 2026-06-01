import type { Dispatch, SetStateAction } from "react";

type SetSession = {
  setSession: Dispatch<SetStateAction<string | null>>;
};

function Navbar({ setSession }: SetSession) {
  return (
    <header className="w-screen bg-slate-300">
      <nav className="px-20 py-3">
        <ul className="flex justify-between items-center">
          <li className="text-2xl font-semibold">React Store</li>
          <li>
            <button
              className="py-1 px-2 bg-red-600 text-white rounded-md border border-gray-600 font-semibold"
              onClick={() => setSession(null)}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
