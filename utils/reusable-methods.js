const leaveDate = () => {
  const randomNu = Math.floor(Math.random() * 100) + 1;
  return randomNu;
};
const generateDates = () => {
  const today = new Date();

  const fromDate = new Date(today.setDate(today.getDate() + leaveDate()));
  const toDate = new Date(fromDate);
  toDate.setDate(fromDate.getDate() + 3);
  const formatDate = (date) => date.toISOString().split("T")[0];
  return {
    from: formatDate(fromDate),
    to: formatDate(toDate),
    noOfDays: 4,
  };
};
async function waitForVisible() {}
module.exports = { generateDates, leaveDate };
