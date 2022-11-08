/* eslint-disable indent */
/* eslint-disable newline-per-chained-call */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";

import moment from "moment";

import { mapColors } from "../../helpers/random-colors";
import { api } from "../../services/api";
import { enUs } from "./map-date";
import * as S from "./styles";

type Properties = {
  day: string;
  key: "Segunda" | "Terça" | "Quarta" | "Quinta" | "Sexta";
  records: string;
  isOld: boolean;
  records_available: string;
};

type Schedule = {
  [key in keyof Properties]: any;
};

const DDMMYYYY = "DD-MM-YYYY";

const DashboardComponent = () => {
  const [data, setData] = useState<Properties[]>([]);

  const handleRequest = async () => {
    try {
      const dateObject = new Date();
      const isoWeek = `${moment(dateObject).isoWeek()}`;
      const isoYear = dateObject.getFullYear().toString();

      const response = await api.get("/schedule", {
        params: {
          isoWeek,
          isoYear,
        },
      });

      if (!response.data.ok) {
        throw new Error(response.data.message);
      }

      const { payload } = response.data;
      const week = Object.assign([], payload);

      const newWeek = week.map((item: Schedule) => {
        const dayName = enUs[item.day as keyof typeof enUs];
        const date = moment().isoWeekday(dayName).format(DDMMYYYY);
        const currentDate = moment().format(DDMMYYYY);
        const isWeekBeforeCurrentDate = moment(date).isSameOrAfter(currentDate);

        return {
          key: item.day,
          isOld: isWeekBeforeCurrentDate,
          day: date,
          records: item.records,
          records_available: item.records_available,
        };
      });

      setData(newWeek);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleRequest();
  }, []);

  return (
    <S.Dashboard>
      {data.length >= 1 &&
        data.map((day) => {
          return (
            <S.Card key={day.day} data-is-date-after={day.isOld}>
              <S.CardHeader>
                <S.CardTitle
                  color={day.day ? (mapColors[day.key] as any) : "segunda"}
                >
                  {day.key.toUpperCase()}
                </S.CardTitle>
                <S.CardDate>{day.day}</S.CardDate>
              </S.CardHeader>
              <S.Records>
                <S.Record>
                  <S.RecordIndicator>{day.records}</S.RecordIndicator>
                  <S.RecordTitle>Totais</S.RecordTitle>
                </S.Record>
                <S.Record>
                  <S.RecordIndicator>
                    {day.records_available}
                  </S.RecordIndicator>
                  <S.RecordTitle>Disponíveis</S.RecordTitle>
                </S.Record>
              </S.Records>
            </S.Card>
          );
        })}
    </S.Dashboard>
  );
};

export { DashboardComponent };