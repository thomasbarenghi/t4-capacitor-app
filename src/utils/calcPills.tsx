export function calculateMedicationCompliance(
  startDate: any,
  initialPillsCount: any,
  isFirstPillTaken: boolean,
  finalPillsCount: any,
  isLastPillTaken: boolean,
) {
  // Convert dates to Date objects
  const startDateObj: any = new Date(startDate);
  const currentDateObj: any = new Date();

  // Calculate the number of days elapsed
  //   const elapsedMilliseconds = currentDateObj - startDateObj;
  //   const elapsedDays = elapsedMilliseconds / (1000 * 60 * 60 * 24);

  const millisecondsPerDay = 24 * 60 * 60 * 1000; // 1 día en milisegundos

  const elapsedMilliseconds = currentDateObj - startDateObj;
  const elapsedDays = Math.floor(elapsedMilliseconds / millisecondsPerDay);

  // Calculate the expected pill count
  const expectedPillCount =
    elapsedDays + (isFirstPillTaken ? 0 : 1) + (isLastPillTaken ? 0 : -1);

  // Calculate the actual pills taken
  const actualPillsTaken = initialPillsCount - finalPillsCount;

  return {
    elapsedDays,
    expectedPillCount,
    actualPillsTaken,
    currentDateObj,
  };
}

// Example usage:
const currentDate = "2023-09-04";
const startDate = "2023-08-01";
const initialPillsCount = 10;
const isFirstPillTaken = true;
const finalPillsCount = 3;
const isLastPillTaken = false;

const result = calculateMedicationCompliance(
  startDate,
  initialPillsCount,
  isFirstPillTaken,
  finalPillsCount,
  isLastPillTaken,
);
