import { Table } from "@mantine/core";
import { memo, ReactNode } from "react";

type Props<T> = {
  header: T;
  body: Record<keyof T, ReactNode>[];
};

export const AppTable = memo(<T extends Record<string, string>>({ header, body }: Props<T>) => {
  const headerArray = Object.values(header);

  return (
    <Table>
      <thead>
        <tr>
          {headerArray.map((value) => {
            return <th key={value}>{value}</th>;
          })}
        </tr>
      </thead>

      <tbody>
        {body.map((obj, i) => {
          return (
            <tr key={i}>
              {Object.values(obj).map((value, i) => {
                return <td key={i}>{value}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
});
AppTable.displayName = "AppTable";
