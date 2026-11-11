import { useAppSelector } from "../../store/hook";
import "./header.css";

export default function Header() {
  const balance = useAppSelector((state) => state.corporationSlice.balance);

  return (
    <div className="header">
      <div className="logo">Factory Simulator</div>
      <div className="balance">
        Баланс: {new Intl.NumberFormat("ru-RU").format(balance)} ₽
      </div>
    </div>
  );
}
