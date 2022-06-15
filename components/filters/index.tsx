import React, { useEffect } from "react";
import { Divider, List } from "@mui/material";
import { map, reduce, upperFirst, values, flatten, reverse } from "lodash";
import FilterItem from "./FilterItem";
import { GroupedItems } from "../../types/types";
interface IFiltersListProps {
  services: GroupedItems;
  onFilterServices: any;
  dispatch: any;
  servicesState: any;
}

const EXCLUDED_PROPERTIES = ["id", "image"];
export default function FiltersList({
  services,
  dispatch,
  servicesState,
}: IFiltersListProps) {
  const getServicesFiltersData = (services: GroupedItems) => {
    const filterPossibilities = reduce(
      services,
      (acc: any, services: object[]) => {
        services.forEach((service: any) => {
          for (const property in service) {
            const upperProperty = upperFirst(property) as string;
            if (!EXCLUDED_PROPERTIES.includes(property)) {
              if (!acc[upperProperty]) {
                acc[upperProperty] = new Set();
              }
              acc[upperProperty].add(service[property]);
            }
          }
        });
        return acc;
      },
      {}
    );
    return filterPossibilities;
  };

  useEffect(() => {
    const computedFilters = getServicesFiltersData(services);
    const parsedFilters = reduce(
      computedFilters,
      (acc: any, filterValues: any, filterName: string) => {
        acc.push({
          title: filterName,
          subFilters: map(Array.from(filterValues), (filterValue) => ({
            title: filterValue,
          })),
        });
        return acc;
      },
      []
    );
    dispatch({
      type: "init",
      payload: { filters: parsedFilters, services: flatten(values(services)) },
    });
  }, [services]);

  return (
    <List component="nav" sx={{ paddingTop: "13vh" }}>
      {map(servicesState.initState, (filterDetails, idx) => (
        <div style={{ paddingBottom: "8vh" }}>
          <FilterItem
            key={idx}
            title={filterDetails.title}
            subFilters={filterDetails.subFilters}
            onFilter={(values: any) =>
              dispatch({
                type: "filter",
                filterName: filterDetails.title,
                payload: values,
              })
            }
          />
        </div>
      ))}
    </List>
  );
}
