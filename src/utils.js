import dayjs from "dayjs";

export const formatHistoryAttendances = attendances => {
  return attendances.map(item => {
    const hours = `${dayjs(item.in).format("h:mm A")} - ${dayjs(
      item.out
    ).format("h:mm A")}`;
    const date = `${dayjs(item.in).format("DD-M-YYYY")}`;
    return { ...item, hours, date };
  });
};
