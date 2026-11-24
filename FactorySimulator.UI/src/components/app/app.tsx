import { useEffect } from "react";
import { createConnection } from "../../services/signalR";
import { useAppDispatch, useAppSelector } from "../../store/hook.ts";
import Header from "../header/header.tsx";
import Main from "../main/main.tsx";
import { fetchConstructions } from "../../store/slices/constructions-slice.ts";
import { fetchEquipments } from "../../store/slices/equipments-slice.ts";
import {
  fetchCorporationData,
  updateBalance,
} from "../../store/slices/corporation-slice.ts";
import { fetchGameData } from "../../store/slices/game-slice.ts";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchConstructions());
    dispatch(fetchEquipments());
    dispatch(fetchCorporationData());
    dispatch(fetchGameData());
  }, [dispatch]);

  useEffect(() => {
    const handleModalHide = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };

    document.addEventListener("hide.bs.modal", handleModalHide);
    return () => {
      document.removeEventListener("hide.bs.modal", handleModalHide);
    };
  }, []);

  useEffect(() => {
    const connection = createConnection();

    connection.on("BalanceUpdated", (balance: number) => {
      dispatch(updateBalance(balance));
    });

    connection
      .start()
      .then(() => console.log("SignalR connected"))
      .catch((error) => console.error("SignalR error:", error));

    return () => {
      connection.off("BalanceUpdated");
      void connection.stop();
    };
  }, []);

  const constructionsStatus = useAppSelector(
    (state) => state.constructionsSlice.status,
  );
  const equipmentStatus = useAppSelector(
    (state) => state.equipmentsSlice.status,
  );
  const gameStatus = useAppSelector((state) => state.gameSlice.status);

  const completedRequests = [
    equipmentStatus,
    constructionsStatus,
    gameStatus,
  ].filter((status) => status === "succeeded").length;

  const progress = (completedRequests / 2) * 100;

  if (
    equipmentStatus !== "succeeded" ||
    constructionsStatus !== "succeeded" ||
    gameStatus !== "succeeded"
  ) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="w-100" style={{ maxWidth: "350px" }}>
          <div
            className="progress"
            role="progressbar"
            aria-label="Загрузка данных"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ height: "10px" }}
          >
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: `${progress}%`, transition: "width 0.5s ease" }}
            />
          </div>
          <div className="text-center mt-2 text-secondary">
            Загрузка данных... {progress}%
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
