import { useState } from "react";
import { calculateMedicationCompliance } from "@/utils/calcPills";
import { Share } from "@capacitor/share";
import {
  Page,
  Navbar,
  Link,
  NavRight,
  Block,
  BlockTitle,
  List,
  Button,
  Popup,
  View,
  ListInput,
  Toggle,
} from "framework7-react";

export default function Home() {
  const [startDate, setStartDate] = useState(new Date());
  const [initialPillsCount, setInitialPillsCount] = useState(0);
  const [isFirstPillTaken, setIsFirstPillTaken] = useState(false);
  const [finalPillsCount, setFinalPillsCount] = useState(0);
  const [isLastPillTaken, setIsLastPillTaken] = useState(false);
  const [resultMessage, setResultMessage] = useState({}) as any;

  const handleClean = () => {
    setStartDate(new Date());
    setInitialPillsCount(0);
    setIsFirstPillTaken(false);
    setFinalPillsCount(0);
    setIsLastPillTaken(false);
  };

  const handleCalculate = () => {
    const result = calculateMedicationCompliance(
      startDate,
      initialPillsCount,
      isFirstPillTaken,
      finalPillsCount,
      isLastPillTaken,
    );

    setResultMessage({
      m1: `Tomaste ${result.actualPillsTaken} pastillas de ${result.expectedPillCount} esperadas en ${result.elapsedDays} días`,
      m2: isLastPillTaken
        ? ""
        : `Ten en cuenta que aun debes tomar la pastilla de hoy`,

      m3: isFirstPillTaken
        ? ""
        : `Ten en cuenta que no tomaste la primera pastilla`,
    });

    handleClean();
  };

  const handleShare = async (message: string) => {
    try {
      await Share.share({
        text: message,
      });
    } catch (error) {
      console.log("Error sharing", error);
    }
  };

  return (
    <Page>
      <Navbar title="T4 App" />
      <Block>
        <BlockTitle>Fecha de inicio</BlockTitle>
        <List>
          <ListInput
            required
            type="datepicker"
            placeholder="Selecciona la fecha"
            value={[startDate]}
            readonly
            calendarParams={{
              dateFormat: { weekday: "short", month: "short", day: "2-digit" },
            }}
            onCalendarChange={(e) => {
              setStartDate(e[0]);
            }}
          />
        </List>
      </Block>
      <Block>
        <BlockTitle>Cantidad de pastillas inicial</BlockTitle>
        <List>
          <ListInput
            type="number"
            required
            value={initialPillsCount}
            placeholder="Cantidad"
            onChange={(e) => {
              setInitialPillsCount(e.target.value);
            }}
          />
        </List>
      </Block>
      <Block>
        <BlockTitle>¿Se tomó la primera pastilla?</BlockTitle>
        <List>
          <Toggle
            checked={isFirstPillTaken}
            onChange={() => {
              setIsFirstPillTaken(!isFirstPillTaken);
            }}
          />
        </List>
      </Block>
      <Block>
        <BlockTitle>¿Cuántas pastillas quedan?</BlockTitle>
        <List>
          <ListInput
            type="number"
            required
            value={finalPillsCount}
            placeholder="Cantidad"
            onChange={(e) => {
              setFinalPillsCount(e.target.value);
            }}
          />
        </List>
      </Block>
      <Block>
        <BlockTitle>¿Tomó la pastilla de hoy?</BlockTitle>
        <List>
          <Toggle
            checked={isLastPillTaken}
            onChange={() => {
              setIsLastPillTaken(!isLastPillTaken);
            }}
          />
        </List>
      </Block>
      <Block>
        <Button fill raised popupOpen="#result" onClick={handleCalculate}>
          Calcular
        </Button>
      </Block>
      <Popup id="result">
        <View>
          <Page>
            <Navbar title="Resultado">
              <NavRight>
                <Link popupClose>Cerrar</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p className="font-semibold">{resultMessage.m1}</p>
              <p>{resultMessage.m2}</p>
              <p>{resultMessage.m3}</p>
              <Button fill raised onClick={() => handleShare(resultMessage.m1)}>
                Compartir
              </Button>
            </Block>
          </Page>
        </View>
      </Popup>
    </Page>
  );
}

// import { useState } from "react";
// import { calculateMedicationCompliance } from "@/utils/calcPills";
// import {
//   Page,
//   Navbar,
//   Link,
//   NavRight,
//   Block,
//   BlockTitle,
//   List,
//   Button,
//   Popup,
//   View,
//   ListInput,
//   Toggle,
// } from "framework7-react";

// export default () => {
//   const startDate = "2023-09-01";
//   const initialPillsCount = 10;
//   const isFirstPillTaken = true;
//   const finalPillsCount = 7;
//   const isLastPillTaken = false;

//   const result = calculateMedicationCompliance(
//     startDate,
//     initialPillsCount,
//     isFirstPillTaken,
//     finalPillsCount,
//     isLastPillTaken,
//   );

//   console.log(
//     `Tomaste ${result.actualPillsTaken} pastillas de ${result.expectedPillCount} esperadas en ${result.elapsedDays} días`
//   );
//   if (!isLastPillTaken)
//     console.log(`Ten encuenta que aun debes tomar la pastilla de hoy`);

//     console.log(result.currentDateObj);

//     console.log(result.elapsedDays);

//   return <Page></Page>;
// };
