import React, { useEffect } from "react";
import { Divider, List, ListSubheader,Typography } from "@mui/material";
import { map, reduce, upperFirst, values, flatten } from "lodash";
import FilterItem, { IFilterItemProps } from "./FilterItem";
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
    <List sx={{ margin:2, width: "100%", maxWidth: 360}} component="nav">
      <Typography fontFamily="Lato" variant="h5" sx={{margin:2,color:"#224870"}} ><strong>Filters</strong></Typography>
      <Divider></Divider>
      {map(servicesState.initState, (filterDetails, idx) => (
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
      ))}
    </List>
  );
}
