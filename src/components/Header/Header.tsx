import HeaderBrand from "./HeaderBrand";
import HeaderInteractive from "./HeaderInteractive";

export default function Header() {
  return (
    <header>
      <div className="w-full h-[72px] flex flex-row justify-between items-center px-24 py-3">
        <HeaderBrand />
        <HeaderInteractive />
      </div>
    </header>
  );
}
